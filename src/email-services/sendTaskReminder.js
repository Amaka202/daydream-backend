const db = require('../database/db');

const { sendTaskReminderMail } = require('./sendMailFunctions');

const editEntry = async (req, res, next) => {
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
};