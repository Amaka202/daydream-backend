import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET = process.env.JWT_SECRET_CODE;

class AuthenticateUser {
  static async checkToken(req, res, next) {
    try {
      const header = req.headers.authorization;
      if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1] || req.token;
        const decodedtoken = jwt.verify(token, SECRET);

        if (decodedtoken) {
          req.user = decodedtoken;
          req.token = token;
          return next();
        }
        return res.sendStatus(401).json({
          status: 'error',
          message: 'Invalid token',
        });
      }

      return res.status(403).json({
        status: 'error',
        message: 'Unauthorized'
      });
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = AuthenticateUser;