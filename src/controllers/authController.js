import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../database/db';
import isValidEmail from '../helpers/helpers';

dotenv.config();

const SECRET = process.env.JWT_SECRET_CODE;

class Auth {
  static async signUp(req, res, next) {
    const {
      firstname, lastname, email, password
    } = req.body;
    try {
      if (!firstname || !lastname || !email || !password) {
        return res.status(401).json({
          status: 'error',
          message: 'please fill required field'
        });
      }

      const findUserByEmail = await db.query('SELECT * FROM users WHERE email=$1 LIMIT 1', [email]);
      if (findUserByEmail.rows.length) {
        return res.status(401).json({
          status: 'error',
          message: 'Email already exists'
        });
      }

      if (!isValidEmail(email)) {
        return res.status(401).json({
          status: 'error',
          message: 'Please enter a valid email'
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await db.query(
        'INSERT INTO users (firstname, lastname, email, password) VALUES ($1,$2,$3,$4) RETURNING *',
        [firstname, lastname, email, hashedPassword]
      );

      const token = jwt.sign(
        { id: result.rows[0].id },
        SECRET, { expiresIn: '30d' }
      );
      return res.status(200).json({
        status: 'success',
        message: 'user sign up successful',
        data: result.rows[0],
        token
      });
    } catch (error) {
      return next(error);
    }
  }

  static async loGin(req, res, next) {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(401).json({
          status: 'error',
          message: 'email and password required'
        });
      }

      const findByEmail = await db.query('SELECT * FROM users WHERE email=$1', [email]);
      if (!findByEmail.rows.length) {
        return res.status(401).json({
          message: 'invalid email or password'
        });
      }

      const hashedPassword = await bcrypt.compare(
        password, findByEmail.rows[0].password
      );

      if (hashedPassword === false) {
        return res.status(401).json({
          message: 'invalid password'
        });
      }

      const token = jwt.sign(
        { email: findByEmail.rows[0].email, id: findByEmail.rows[0].id },
        SECRET, { expiresIn: '30d' }
      );

      return res.status(200).json({
        status: 'success',
        message: 'sign in successful',
        data: findByEmail.rows[0],
        token
      });
    } catch (error) {
      return next(error);
    }
  }
}

export default Auth;