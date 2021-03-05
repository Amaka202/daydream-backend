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
      SELECT users.firstname,  enteries.id, enteries.user_id, enteries.mood, enteries.title, enteries.entry, enteries.date, enteries.createdat
      FROM users
      INNER JOIN enteries
      ON enteries.user_id = users.id
      ORDER BY enteries.date DESC`);

      result = await result.rows.filter((val) => val.user_id === userId);
      console.log('jhey');
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
    const {
      title, entry, date, mood
    } = req.body;

    try {
      if (!title || !entry || !date || !mood) {
        return res.status(400).json({
          status: 'error',
          message: 'All fields required'
        });
      }

      const result = await db.query(
        'INSERT INTO enteries (title, entry, date, mood, user_id) VALUES ($1,$2,$3,$4,$5) RETURNING *',
        [title, entry, date, mood, userId]
      );
      console.log('from here');
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
    const {
      entry, title, date, mood
    } = req.body;
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
      const moodToUpdate = mood || originalEntry.rows[0].mood;
      
      const result = await db.query(
        'UPDATE enteries SET title=$1, entry=$2, date=$3, mood=$4 WHERE id=$5 RETURNING *',
        [titleToUpdate, entryToUpdate, dateToUpdate, moodToUpdate, entryId]
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
      console.log('delete success');

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