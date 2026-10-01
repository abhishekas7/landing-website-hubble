import { google } from "googleapis";

const auth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

auth.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({
  version: "v3",
  auth,
});

export const CALENDAR_ID =
  process.env.GOOGLE_CALENDAR_ID || "primary";

export const TIME_ZONE =
  process.env.GOOGLE_CALENDAR_TIMEZONE || "Asia/Kolkata";