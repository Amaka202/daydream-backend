const db = require('../database/db');

class Entries {
  /**
   *  @description create an entry
   *  @param { object }
   *
   *  @returns { object } - entry created
   * */

  static async getAllEnteries(req, res, next) {
    const { id: userId } = req.user;
    try {
      let result = await db.query(`
      SELECT users.firstname,  enteries.id, enteries.user_id, enteries.title, enteries.entry, enteries.date, enteries.createdat
      FROM users
      INNER JOIN enteries
      ON enteries.user_id = users.id
      ORDER BY enteries.createdat DESC`);

      result = await result.rows.filter((val) => val.user_id === userId);
      return res.status(200).json({
        status: 'success',
        message: 'fetched all enteries successfully',
        data: result
      });
    } catch (e) {
      return next(e);
    }
  }

  static async createEntry(req, res, next) {
    const { id: userId } = req.user;
    const { title, entry, date } = req.body;

    try {
      if (!title || !entry || !date) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields required'
        });
      }

      const result = await db.query(
        'INSERT INTO enteries (title, entry, date, user_id) VALUES ($1,$2,$3, $4) RETURNING *',
        [title, entry, date, userId]
      );
      return res.status(200).json({
        status: 'success',
        message: 'Entry successfully added',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  static async editEntry(req, res, next) {
    const { entry, title, date } = req.body;
    const { entryId } = req.params;
    try {
      if (!entryId) {
        return res.status(401).json({
          status: 'error',
          message: 'Entry id needed'
        });
      }

      const originalEntry = await db.query(
        'SELECT * FROM enteries WHERE id=$1', [entryId]
      );

      const entryToUpdate = entry || originalEntry.rows[0].entry;
      const titleToUpdate = title || originalEntry.rows[0].title;
      const dateToUpdate = date || originalEntry.rows[0].date;
      const result = await db.query(
        'UPDATE enteries SET title=$1, entry=$2, date=$3 WHERE id=$4 RETURNING *',
        [titleToUpdate, entryToUpdate, dateToUpdate, entryId]
      );
      console.log(result.rows[0]);
      return res.status(200).json({
        status: 'success',
        message: 'Entry successfully updated',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }

  static async deleteEntry(req, res, next) {
    const { entryId } = req.params;
    try {
      if (!entryId) {
        return res.status(401).json({
          status: 'error',
          message: 'Entry id needed'
        });
      }

      const result = await db.query(
        'DELETE FROM enteries WHERE id=$1', [entryId]
      );

      return res.status(200).json({
        status: 'success',
        message: 'Entry successfully deleted',
        data: result.rows[0]
      });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = Entries;