const express = require('express');

const Reminders = require('../controllers/remindersControllers');
const AuthenticateUser = require('../middleware/checkTokenFunction');

const router = express.Router();

router.post('/reminders', AuthenticateUser.checkToken, Reminders.createReminder);
router.delete('/reminders/:reminderId/delete', AuthenticateUser.checkToken, Reminders.deleteReminder);
router.get('/reminders', AuthenticateUser.checkToken, Reminders.getReminders);

module.exports = router;