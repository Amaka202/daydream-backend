import db from '../database/db';

class User {
  static async getUser(req, res, next) {
    const { id: userId } = req.user;

    try {
      const result = await db.query('SELECT * FROM users WHERE id=$1', [userId]);
      return res.status(200).json({
        status: 'success',
        message: 'user fetched successfully',
        data: result.rows
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default User;