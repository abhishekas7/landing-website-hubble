
import { calendar, CALENDAR_ID, TIME_ZONE } from "./google-calender";

interface CreateConsultEventParams {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message?: string;
  startTime: string;
}

export async function createConsultEvent({
  name,
  email,
  phone,
  company,
  message,
  startTime,
}: CreateConsultEventParams) {
  const start = new Date(startTime);

  const end = new Date(
    start.getTime() +
      Number(process.env.CONSULTATION_DURATION || 30) *
        60 *
        1000
  );

  const requestId =
    `consult-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

  const event = await calendar.events.insert({
    calendarId: CALENDAR_ID
    ,

    conferenceDataVersion: 1,

    sendUpdates: "all",

    requestBody: {
      summary: `Consultation with ${name}`,

      description: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        company ? `Company: ${company}` : "",
        message ? `Message: ${message}` : "",
      ]
        .filter(Boolean)
        .join("\n"),

      start: {
        dateTime: start.toISOString(),
        timeZone: TIME_ZONE,
      },

      end: {
        dateTime: end.toISOString(),
        timeZone: TIME_ZONE,
      },

      attendees: [
        {
          email,
          displayName: name,
        },
      ],

      conferenceData: {
        createRequest: {
          requestId,

          conferenceSolutionKey: {
            type: "hangoutsMeet",
          },
        },
      },
    },
  });

  const conferenceData =
    event.data.conferenceData;

  const meetLink =
    conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === "video"
    )?.uri;

  return {
    eventId: event.data.id,
    calendarLink: event.data.htmlLink,
    meetLink,
  };
}