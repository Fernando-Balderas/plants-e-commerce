import nodemailer from 'nodemailer'

export default function sendCustomEmail(
  email: string,
  subject: string,
  text: string
) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.SUPPORT_EMAIL,
      clientId: process.env.GMAIL_CLIENT_ID,
      clientSecret: process.env.GMAIL_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_ACCESS_TOKEN,
    },
  })
  transporter.sendMail(
    {
      from: process.env.SUPPORT_EMAIL,
      to: email,
      subject: subject,
      text: text,
    },
    (err, info) => {
      if (err) console.log(err)
      console.log(info)
    }
  )
}
