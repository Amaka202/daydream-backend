const db = require('../database/db');

class Reminders {
  /**
   *  @description create a reminder
   *  @param { object }
   *
   *  @returns { object } - reminder created
   * */
  static async getReminders(req, res, next) {
    const { id: userId } = req.user;

    try {
      let result = await db.query(`
      SELECT users.firstname, reminders.id, reminders.user_id, reminders.reminder, reminders.date, reminders.createdat
      FROM users
      INNER JOIN reminders
      ON reminders.user_id = users.id
      ORDER BY reminders.date`);

      result = await result.rows.filter((val) => val.user_id === userId);

      return res.status(200).json({
        status: 'success',
        message: 'fetched all reminders successfully',
        data: result
      });
    } catch (e) {
      return next(e);
    }
  }

  static async createReminder(req, res, next) {
    const { id: userId } = req.user;
    const { reminder, date } = req.body;
    try {
      if (!reminder || !date) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields required'
        });
      }

      const result = await db.query(
        'INSERT INTO reminders (reminder, date, user_id) VALUES ($1,$2,$3) RETURNING *',
        [reminder, date, userId]
      );
      return res.status(200).json({
        status: 'success',
        message: 'reminder successfully added',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  static async markReminderAsDone(req, res, next) {
    const { isDone } = req.body;
    const { reminderId } = req.params;
    try {
      if (!reminderId) {
        return res.status(401).json({
          status: 'error',
          message: 'reminder id needed'
        });
      }

      if (!isDone) {
        return res.status(401).json({
          status: 'error',
          message: 'State of the reminder required'
        });
      }

      const result = await db.query(
        'UPDATE reminders SET isdone=$1 WHERE id=$2 RETURNING *',
        [isDone, reminderId]
      );

      return res.status(200).json({
        status: 'success',
        message: 'reminder updated successfully',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  static async deleteReminder(req, res, next) {
    const { reminderId } = req.params;
    try {
      if (!reminderId) {
        return res.status(401).json({
          status: 'error',
          message: 'Reminder id needed'
        });
      }

      const result = await db.query(
        'DELETE FROM reminders WHERE id=$1', [reminderId]
      );

      return res.status(200).json({
        status: 'success',
        message: 'Reminder successfully deleted',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = Reminders;