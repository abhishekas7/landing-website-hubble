import { calendar } from "googleapis/build/src/apis/calendar";
import { CALENDAR_ID, TIME_ZONE } from "./google-calender";

const DURATION = Number(
  process.env.CONSULTATION_DURATION || 30
);

const START_HOUR = Number(
  process.env.CONSULTATION_START_HOUR || 10
);

const END_HOUR = Number(
  process.env.CONSULTATION_END_HOUR || 18
);

export async function getAvailableSlots(date: string) {
  const start = new Date(`${date}T00:00:00+05:30`);
  const end = new Date(`${date}T23:59:59+05:30`);

  const response = await calendar.freebusy.query({
    requestBody: {
      timeMin: start.toISOString(),
      timeMax: end.toISOString(),
      timeZone: TIME_ZONE,
      items: [
        {
          id: CALENDAR_ID,
        },
      ],
    },
  });

  const busy =
    response.data.calendars?.[CALENDAR_ID]?.busy || [];

  const slots: string[] = [];

  const current = new Date(start);
  current.setHours(START_HOUR, 0, 0, 0);

  const closing = new Date(start);
  closing.setHours(END_HOUR, 0, 0, 0);

  while (current < closing) {
    const slotStart = new Date(current);

    const slotEnd = new Date(
      current.getTime() + DURATION * 60 * 1000
    );

    if (slotEnd > closing) {
      break;
    }

    const isBusy = busy.some((period: { start: string | number | Date; end: string | number | Date; }) => {
      if (!period.start || !period.end) {
        return false;
      }

      const busyStart = new Date(period.start);
      const busyEnd = new Date(period.end);

      return (
        slotStart < busyEnd &&
        slotEnd > busyStart
      );
    });

    if (!isBusy) {
      slots.push(slotStart.toISOString());
    }

    current.setMinutes(
      current.getMinutes() + DURATION
    );
  }

  return slots;
}