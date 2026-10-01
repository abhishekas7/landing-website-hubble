import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/app/lib/consult-slot";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { success: false, error: "A valid date (YYYY-MM-DD) is required" },
        { status: 400 }
      );
    }

    // Don't allow booking in the past (compare date strings, timezone-safe)
    const todayStr = new Date()
      .toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }); // "YYYY-MM-DD"
    if (date < todayStr) {
      return NextResponse.json(
        { success: false, error: "Cannot fetch slots for a past date" },
        { status: 400 }
      );
    }

    // Check that Google Calendar credentials are configured
    if (
      !process.env.GOOGLE_CLIENT_ID ||
      !process.env.GOOGLE_CLIENT_SECRET ||
      !process.env.GOOGLE_REFRESH_TOKEN ||
      process.env.GOOGLE_REFRESH_TOKEN.includes("xxxx")
    ) {
      console.warn("[slots] Google Calendar credentials not configured – returning empty slots.");
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Calendar is not yet configured. Please add a valid GOOGLE_REFRESH_TOKEN to your .env file.",
        },
        { status: 503 }
      );
    }

    const slots = await getAvailableSlots(date);

    return NextResponse.json({ success: true, slots }, { status: 200 });
  } catch (error: unknown) {
    console.error("[slots] Error:", error);

    // Surface a readable message for common Google API errors
    const errMsg =
      error instanceof Error ? error.message : String(error);

    if (errMsg.includes("invalid_grant") || errMsg.includes("Invalid Credentials")) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Google Calendar authentication failed. Your refresh token may be expired or invalid. Re-run the OAuth flow to get a new one.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to fetch available slots. Please try again." },
      { status: 500 }
    );
  }
}