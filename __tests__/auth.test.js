// require('dotenv').config();

// process.env.NODE_ENV = 'test';

// const request = require('supertest');

// const db = require('../src/database/db');

// const app = require('../app');

// let token;

// beforeAll(async () => {
//   try {
//     const newUser = await request(app)
//       .post('/api/v1/signup')
//       .send({
//         email: process.env.TEST_USER_EMAIL,
//         password: process.env.TEST_USER_PASSWORD,
//         firstname: 'Amaka',
//         lastname: 'Umeh'
//       });
//   } catch (err) {
//     console.log(err);
//   }
// });

// afterAll(async () => {
//   await db.query('DELETE FROM users');
// });

// describe('POST /api/v1/login', () => {
//   test('It logs in a user', async () => {
//     try {
//       const loggedInUser = await request(app)
//         .post('/api/v1/login')
//         .send({
//           email: process.env.TEST_USER_EMAIL,
//           password: process.env.TEST_USER_PASSWORD,
//         });
//       token = loggedInUser.body.token;
//       console.log(token);
//       expect(loggedInUser.body).toHaveProperty('token');
//       expect(loggedInUser.body.message).toBe('sign in successful');
//       expect(loggedInUser.body.status).toBe('success');
//       expect(loggedInUser.body.status).not.toBe('error');
//       expect(loggedInUser.statusCode).toBe(200);
//       expect(loggedInUser.statusCode).not.toBe(401);
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   test('fails to login a user', async () => {
//     try {
//       const loggedInUser = await request(app)
//         .post('/api/v1/login')
//         .send({
//           email: process.env.TEST_USER_EMAIL
//         });
//       expect(loggedInUser.body.message).not.toBe('sign in successful');
//       expect(loggedInUser.body.message).toBe('email and password required');
//       expect(loggedInUser.statusCode).toBe(401);
//       expect(loggedInUser.statusCode).not.toBe(200);
//       expect(loggedInUser.body.status).not.toBe('success');
//       expect(loggedInUser.body.status).toBe('error');
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });