const express = require('express');
const checkUserToken = require('../middleware/checkTokenFunction');

const Reminders = require('../controllers/remindersControllers');

const router = express.Router();

router.post('/reminders', checkUserToken, Reminders.createReminder);
router.delete('/reminders/:reminderId/delete', checkUserToken, Reminders.deleteReminder);
router.get('/reminders', checkUserToken, Reminders.getReminders);

module.exports = router;