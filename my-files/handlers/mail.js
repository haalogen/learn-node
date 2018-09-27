const nodemailer = require('nodemailer'); // Does email sending
const pug = require('juice');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }
});

exports.send = async (options) => {
  const mailOptions = {
    from: 'Stan <noreply@example.com>',
    to: options.user.email,
    subject: options.subject,
    html: 'This will be filled in later',
    text: 'This also will be filled in later',
  };

  // promisify(func, bindingObject)
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions)
}