import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim();

    // Check if email already exists in the database
    const existing = await pool.query(
      "SELECT id FROM consultations WHERE LOWER(email) = LOWER($1) LIMIT 1",
      [trimmedEmail]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "This email has already submitted a consultation request",
          errors: { email: "This email has already submitted a consultation request" },
        },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `INSERT INTO consultations (name, email, phone, company, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name.trim(), trimmedEmail, phone || null, company || null, message.trim()]
    );

    return NextResponse.json({
      success: true,
      message: "Consultation submitted successfully",
      data: result.rows[0],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to submit consultation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await pool.query(
      "SELECT * FROM consultations ORDER BY id DESC"
    );
    return NextResponse.json({ success: true, data: result.rows });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch consultations" },
      { status: 500 }
    );
  }
}
