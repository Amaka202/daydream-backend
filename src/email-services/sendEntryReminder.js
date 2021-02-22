const cron = require('node-cron');

const db = require('../database/db');

const { sendEntryReminderMail } = require('./sendMailFunctions');

cron.schedule('* * * * *', () => { console.log(`Task is running every minute ${new Date()}`); });
