import db from '../database/db';

class Tasks {
  /**
   *  @description create an entry
   *  @param { object }
   *
   *  @returns { object } - entry created
   * */

  static async getUnDoneTasks(req, res, next) {
    try {
      const result = await db.query(`
      SELECT users.firstname, tasks.id, tasks.task, tasks.isdone, tasks.date, tasks.createdat
      FROM users
      INNER JOIN tasks
      ON tasks.user_id = users.id
      WHERE isdone='FALSE'
      ORDER BY tasks.createdat DESC`);
      return res.status(200).json({
        status: 'success',
        message: 'fetched all tasks successfully',
        data: result.rows
      });
    } catch (e) {
      return next(e);
    }
  }

  static async getDoneTasks(req, res, next) {
    try {
      const result = await db.query(`
      SELECT users.firstname, tasks.id, tasks.task, tasks.isdone, tasks.date, tasks.createdat
      FROM users
      INNER JOIN tasks
      ON tasks.user_id = users.id
      WHERE isdone='TRUE'
      ORDER BY tasks.createdat DESC`);
      return res.status(200).json({
        status: 'success',
        message: 'fetched all tasks successfully',
        data: result.rows
      });
    } catch (e) {
      return next(e);
    }
  }

  static async createTask(req, res, next) {
    const { id: userId } = req.user;
    const { task, date } = req.body;
    const isDone = 'FALSE';
    try {
      if (!task || !date) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields required'
        });
      }

      const result = await db.query(
        'INSERT INTO enteries (task, date, isdone, user_id) VALUES ($1,$2,$3,$4) RETURNING *',
        [task, date, isDone, userId]
      );
      return res.status(200).json({
        status: 'success',
        message: 'task successfully added',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  static async markTaskAsDone(req, res, next) {
    const { isDone } = req.body;
    const { taskId } = req.params;
    try {
      if (!taskId) {
        return res.status(401).json({
          status: 'error',
          message: 'Task id needed'
        });
      }

      if (!isDone) {
        return res.status(401).json({
          status: 'error',
          message: 'State of the task required'
        });
      }

      const result = await db.query(
        'UPDATE tasks SET isdone=$1 WHERE id=$2 RETURNING *',
        [isDone, taskId]
      );

      return res.status(200).json({
        status: 'success',
        message: 'task updated successfully',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  static async deleteTask(req, res, next) {
    const { taskId } = req.params;
    try {
      if (!taskId) {
        return res.status(401).json({
          status: 'error',
          message: 'Task id needed'
        });
      }

      const result = await db.query(
        'DELETE FROM tasks WHERE id=$1', [taskId]
      );

      return res.status(200).json({
        status: 'success',
        message: 'Task successfully deleted',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }
}