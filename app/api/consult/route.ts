import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, email, and message are required",
        },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone?.trim() || null;
    const trimmedCompany = company?.trim() || null;
    const trimmedMessage = message.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { status: 400 }
      );
    }

    // Create if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS consultations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert submitted values
    const result = await pool.query(
      `INSERT INTO consultations
        (name, email, phone, company, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        trimmedName,
        trimmedEmail,
        trimmedPhone,
        trimmedCompany,
        trimmedMessage,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Consultation submitted successfully",
        data: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Consultation API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit consultation",
      },
      { status: 500 }
    );
  }
}
