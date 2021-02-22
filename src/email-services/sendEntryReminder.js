const cron = require('node-cron');

const db = require('../database/db');

const { sendEntryReminderMail } = require('./sendMailFunctions');

// cron.schedule('* * * * *', () => { console.log(`Task is running every minute ${new Date()}`); });

const getUsers = async () => {
  try {
    let result = await db.query('SELECT * FROM users');
    result = result.rows;
    return result.forEach((val) => cron.schedule('0 20 * * *', () => { sendEntryReminderMail(val.firstname, val.email); }));
  } catch (error) {
    return console.log(error);
  }
};

getUsers();