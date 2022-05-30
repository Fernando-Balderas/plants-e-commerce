import nodemailer from 'nodemailer'

export default function sendCustomEmail(
  email: string,
  subject: string,
  text: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 0,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  transporter.sendMail(
    {
      from: process.env.SUPPORT_EMAIL,
      to: email || process.env.SUPPORT_EMAIL,
      subject: subject,
      text: text,
    },
    (err, info) => {
      if (err) console.log(err)
      console.log(info)
    }
  )
}
