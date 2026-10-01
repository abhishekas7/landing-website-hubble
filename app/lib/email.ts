import nodemailer from "nodemailer";

const transporter =
  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

interface SendConsultEmailParams {
  name: string;
  email: string;
  startTime: string;
  meetLink: string;
  calendarLink?: string | null;
}

export async function sendConsultConfirmation({
  name,
  email,
  startTime,
  meetLink,
  calendarLink,
}: SendConsultEmailParams) {
  const formattedDate =
    new Intl.DateTimeFormat("en-IN", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(startTime));

  await transporter.sendMail({
    from: `"Cavli Hubble" <${process.env.SMTP_USER}>`,
    to: email,

    subject:
      "Your Cavli Hubble consultation is confirmed",

    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>Consultation Confirmed</h2>

        <p>
          Hi ${name},
        </p>

        <p>
          Your consultation has been successfully booked.
        </p>

        <p>
          <strong>Date & Time:</strong><br />
          ${formattedDate}
        </p>

        <p>
          <a
            href="${meetLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              background:#6B53AE;
              color:#fff;
              text-decoration:none;
              border-radius:6px;
            "
          >
            Join Google Meet
          </a>
        </p>

        ${
          calendarLink
            ? `
              <p>
                <a href="${calendarLink}">
                  View calendar event
                </a>
              </p>
            `
            : ""
        }

        <p>
          We look forward to speaking with you.
        </p>
      </div>
    `,
  });
}