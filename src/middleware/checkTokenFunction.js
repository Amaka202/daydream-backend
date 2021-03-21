const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const SECRET = process.env.JWT_SECRET_CODE;

const UNAUTHORIZED_CODE = 401;

const checkUserToken = (req, res, next) => {
  const header = req.headers.authorization;
  try {
    if (typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1] || req.token;
      const decodedToken = jwt.verify(token, SECRET);
      if (decodedToken) {
        req.user = decodedToken;
        req.token = token;
        return next();
      }
      return res.status(UNAUTHORIZED_CODE).json({
        code: UNAUTHORIZED_CODE,
        message: 'Not Authorized',
      });
    }
    // if header is undefined , return bad request
    return res.status(UNAUTHORIZED_CODE).json({
      code: UNAUTHORIZED_CODE,
      message: 'Not Authorized',
    });
  } catch (error) {
    return res.status(UNAUTHORIZED_CODE).json({
      code: UNAUTHORIZED_CODE,
      message: 'Not Authorized',
    });
  }
};

module.exports = checkUserToken;