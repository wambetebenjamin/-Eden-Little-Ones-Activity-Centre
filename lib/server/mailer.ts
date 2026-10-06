import nodemailer from "nodemailer";

// Nodemailer transport for general enquiries. Falls back to logging when SMTP
// env vars are not configured so forms keep working in preview/dev.
export async function sendMail(opts: { to: string; subject: string; text: string }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || "Eden Little Ones <no-reply@edenlittleones.co.ke>";

  if (!host || !user || !pass) {
    console.log("[mailer:dev-fallback]", { to: opts.to, subject: opts.subject, text: opts.text });
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({ from, to: opts.to, subject: opts.subject, text: opts.text });
}
