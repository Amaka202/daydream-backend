import db from '../database/db';

class Reminders {
  /**
   *  @description create a reminder
   *  @param { object }
   *
   *  @returns { object } - reminder created
   * */

  static async getUnDoneReminders(req, res, next) {
    try {
      const result = await db.query(`
      SELECT users.firstname, reminders.id, reminders.reminder, reminders.isdone, reminders.date, reminders.createdat
      FROM users
      INNER JOIN reminders
      ON reminders.user_id = users.id
      WHERE isdone='FALSE'
      ORDER BY reminders.createdat DESC`);
      return res.status(200).json({
        status: 'success',
        message: 'fetched all reminders successfully',
        data: result.rows
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getDoneReminders(req, res, next) {
    try {
      const result = await db.query(`
      SELECT users.firstname, reminders.id, reminders.reminder, reminders.isdone, reminders.date, reminders.createdat
      FROM users
      INNER JOIN reminders
      ON reminders.user_id = users.id
      WHERE isdone='TRUE'
      ORDER BY reminders.createdat DESC`);
      return res.status(200).json({
        status: 'success',
        message: 'fetched all reminders successfully',
        data: result.rows
      });
    } catch (e) {
      return next(e);
    }
  }

  static async createReminder(req, res, next) {
    const { id: userId } = req.user;
    const { reminder, date } = req.body;
    const isDone = 'FALSE';
    try {
      if (!reminder || !date) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields required'
        });
      }

      const result = await db.query(
        'INSERT INTO reminders (reminder, date, isdone, user_id) VALUES ($1,$2,$3,$4) RETURNING *',
        [reminder, date, isDone, userId]
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

export default Reminders;