const sgMail = require('@sendgrid/mail')
const sendgridAPIkey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridAPIkey)

const msg = {
    to: 'bvc123k@gmail.com',
    from: 'bvc100x@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
sgMail.send(msg);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bvc100x@gmail.com',
        subject: 'Thank you for register',
        text: `Welcome to task app, ${name}`,
        html: '<strong>If you have any question, please contact us</strong>',
      })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'bvc100x@gmail.com',
        subject: 'Account have been cancelled',
        text: `Thank for the time you staying with uss, ${name}`,
        html: '<strong>If you have any question, please contact us</strong>',
      })
}

module.exports = { sendWelcomeEmail, sendCancelEmail }