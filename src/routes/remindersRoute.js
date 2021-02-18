const express = require('express');

const Reminders = require('../controllers/remindersControllers');
const AuthenticateUser = require('../middleware/checkTokenFunction');

const router = express.Router();

router.post('/reminder', AuthenticateUser.checkToken, Reminders.createReminder);
router.put('/reminder/:reminderId/done', AuthenticateUser.checkToken, Reminders.markReminderAsDone);
router.delete('/reminder/:reminderId/delete', AuthenticateUser.checkToken, Reminders.deleteReminder);
router.get('/donereminders', AuthenticateUser.checkToken, Reminders.getDoneReminders);
router.get('/undonereminders', AuthenticateUser.checkToken, Reminders.getUnDoneReminders);

module.exports = router;