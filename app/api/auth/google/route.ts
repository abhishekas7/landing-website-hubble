import { NextResponse } from "next/server";
import { google } from "googleapis";


const SCOPES = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events",
];

function getOAuth2Client() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/google` // redirect URI
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json(
      { success: false, error: `OAuth error: ${error}` },
      { status: 400 }
    );
  }

  const oauth2Client = getOAuth2Client();

  if (code) {
    try {
      const { tokens } = await oauth2Client.getToken(code);
      return NextResponse.json({
        success: true,
        message:
          "Copy the refresh_token below and paste it into GOOGLE_REFRESH_TOKEN in your .env, then restart the dev server.",
        refresh_token: tokens.refresh_token,
        access_token: tokens.access_token,
        expiry_date: tokens.expiry_date,
      });
    } catch (err) {
      console.error("[auth/google] Token exchange failed:", err);
      return NextResponse.json(
        { success: false, error: "Failed to exchange code for tokens." },
        { status: 500 }
      );
    }
  }

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", 
    scope: SCOPES,
  });

  return NextResponse.redirect(authUrl);
}
