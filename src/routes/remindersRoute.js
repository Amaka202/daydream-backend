import { Router } from 'express';

import Reminders from '../controllers/remindersControllers';
import checkTokenFunction from '../middleware/checkTokenFunction';

const router = Router();

router.post('/reminder', checkTokenFunction, Reminders.createReminder);
router.put('/reminder/:reminderId/done', checkTokenFunction, Reminders.markReminderAsDone);
router.delete('/reminder/:reminderId/delete', checkTokenFunction, Reminders.deleteReminder);
router.get('/donereminders', checkTokenFunction, Reminders.getDoneReminders);
router.get('/undonereminders', checkTokenFunction, Reminders.getUnDoneReminders);

export default router;