import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'mail.globalcommunityorganization.org',
  port: 465,
  secure: true,
  auth: {
    user: '_mainaccount@globalcommunityorganization.org',
    pass: 'Global@2008',
  },
})

export const sendEmail = async (to: string, text: string, html?: string) => {
  const mailOptions = {
    from: 'globalco@globalcommunityorganization.org',
    to: to,
    subject: 'Global Community Organization',
    text: text,
    html: html,
  }
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log('Email sent: ' + info.response)
        resolve(info)
      }
    })
  })
}