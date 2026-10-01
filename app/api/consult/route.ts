import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import { createConsultEvent } from "@/app/lib/create-consult-event";
import { sendConsultConfirmation } from "@/app/lib/email";

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, message, slotTime } =
      await req.json();

    // ── Validation ─────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (!slotTime) {
      return NextResponse.json(
        { success: false, error: "A time slot must be selected" },
        { status: 400 }
      );
    }

    // Validate slotTime is a real ISO date and not in the past
    const slot = new Date(slotTime);
    if (isNaN(slot.getTime()) || slot < new Date()) {
      return NextResponse.json(
        { success: false, error: "Selected time slot is invalid or in the past" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone?.trim() || null;
    const trimmedCompany = company?.trim() || null;
    const trimmedMessage = message.trim();

    // ── Ensure DB table exists ──────────────────────────────
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS consultations (
          id            SERIAL PRIMARY KEY,
          name          VARCHAR(255) NOT NULL,
          email         VARCHAR(255) NOT NULL,
          phone         VARCHAR(50),
          company       VARCHAR(255),
          message       TEXT NOT NULL,
          slot_time     TIMESTAMPTZ,
          event_id      TEXT,
          meet_link     TEXT,
          calendar_link TEXT,
          created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (dbInitErr: any) {
      console.error("[consult] DB table creation failed:", dbInitErr);
      throw new Error(`DB init failed: ${dbInitErr.message}`);
    }

    // ── Create Google Calendar event with Meet link ─────────
    let eventId: string | null | undefined = null;
    let meetLink: string | null | undefined = null;
    let calendarLink: string | null | undefined = null;

    try {
      const eventResult = await createConsultEvent({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone || "",
        company: trimmedCompany || undefined,
        message: trimmedMessage,
        startTime: slotTime,
      });
      eventId = eventResult.eventId;
      meetLink = eventResult.meetLink;
      calendarLink = eventResult.calendarLink;
    } catch (calErr) {
      console.error("Google Calendar event creation failed:", calErr);
      // Non-fatal: we continue and still store the consultation
    }

    // ── Persist to database ─────────────────────────────────
    let result: any;
    try {
      result = await pool.query(
        `INSERT INTO consultations
          (name, email, phone, company, message, slot_time, event_id, meet_link, calendar_link)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *`,
        [
          trimmedName,
          trimmedEmail,
          trimmedPhone,
          trimmedCompany,
          trimmedMessage,
          slot.toISOString(),
          eventId ?? null,
          meetLink ?? null,
          calendarLink ?? null,
        ]
      );
    } catch (dbInsertErr: any) {
      console.error("[consult] DB INSERT failed:", dbInsertErr);
      throw new Error(`DB insert failed: ${dbInsertErr.message}`);
    }

    // ── Send confirmation email ─────────────────────────────
    if (meetLink) {
      try {
        await sendConsultConfirmation({
          name: trimmedName,
          email: trimmedEmail,
          startTime: slotTime,
          meetLink,
          calendarLink: calendarLink ?? null,
        });
      } catch (mailErr) {
        console.error("Confirmation email failed:", mailErr);
        // Non-fatal: booking is still confirmed
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Consultation booked successfully",
        data: {
          ...result.rows[0],
          meetLink: meetLink ?? null,
          calendarLink: calendarLink ?? null,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[consult] Booking error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to book consultation",
        // debug: remove before going to production
        detail: error?.message ?? String(error),
      },
      { status: 500 }
    );
  }
}
