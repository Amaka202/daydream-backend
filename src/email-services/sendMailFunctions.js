const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  port: process.env.NODEMAILER_PORT,
  host: process.env.NODEMAILER_HOST,
  auth: {
    user: process.env.NODEMAILER_AUTH_USER,
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
  secure: true,
});

const sendTaskReminderMail = (firstname, useremail, reminder) => {
  const mailData = {
    from: 'kutegalaxy404@gmail.com',
    to: useremail,
    subject: 'Reminder from Daydream!',
    text: `${firstname} Remember you have to do this: ${reminder}`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

const sendEntryReminderMail = (firstname, useremail) => {
  const mailData = {
    from: 'DayDream',
    to: useremail,
    subject: 'Reminder from Daydream!',
    text: `Hey ${firstname} Remember to record what happened today`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
    else console.log(info);
  });
};

const sendSignUpConfirmationMail = (firstname, useremail) => {
  const mailData = {
    from: 'DayDream',
    to: useremail,
    subject: 'Sign Up Successful',
    text: `Welcome ${firstname}, Start writting daily!`,
  };

  transporter.sendMail(mailData, (err, info) => {
    if (err) console.log(err);
    else console.log('Email sent succesfully', info);
  });
};

module.exports = {
  sendTaskReminderMail, sendEntryReminderMail, sendSignUpConfirmationMail
};