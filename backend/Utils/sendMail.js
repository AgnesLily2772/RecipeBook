import sgMail from '@sendgrid/mail'

const key = "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"
sgMail.setApiKey(key)
const msg = {
  to: 'agneslily2727@gmail.com', // Change to your recipient
  from: 'agneslily2772@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })