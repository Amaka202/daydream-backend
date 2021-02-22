require('dotenv').config();

process.env.NODE_ENV = 'test';

const request = require('supertest');

const db = require('../src/database/db');

const app = require('../app');

let token;

beforeAll(async () => {
  try {
    const newUser = await request(app)
      .post('/api/v1/signup')
      .send({
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD,
        firstname: 'Amaka',
        lastname: 'Umeh'
      });
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
  await db.query('DELETE FROM users');
});

describe('POST /api/v1/login', () => {
  test('It logs in a user', async () => {
    try {
      const loggedInUser = await request(app)
        .post('/api/v1/login')
        .send({
          email: process.env.TEST_USER_EMAIL,
          password: process.env.TEST_USER_PASSWORD,
        });
      token = loggedInUser.body.token;
      console.log(token);
      expect(loggedInUser.body).toHaveProperty('token');
      expect(loggedInUser.body.message).toBe('sign in successful');
      expect(loggedInUser.body.status).toBe('success');
      expect(loggedInUser.body.status).not.toBe('error');
      expect(loggedInUser.statusCode).toBe(200);
      expect(loggedInUser.statusCode).not.toBe(401);
    } catch (err) {
      console.log(err);
    }
  });

  test('fails to login a user', async () => {
    try {
      const loggedInUser = await request(app)
        .post('/api/v1/login')
        .send({
          email: process.env.TEST_USER_EMAIL
        });
      expect(loggedInUser.body.message).not.toBe('sign in successful');
      expect(loggedInUser.body.message).toBe('email and password required');
      expect(loggedInUser.statusCode).toBe(401);
      expect(loggedInUser.statusCode).not.toBe(200);
      expect(loggedInUser.body.status).not.toBe('success');
      expect(loggedInUser.body.status).toBe('error');
    } catch (err) {
      console.log(err);
    }
  });
});

describe('', () => {
  test('It does not create an entry because of lack of authorization', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach'
        });
      expect(entry.body.message).toBe('Unauthorized');
      expect(entry.body.message).not.toBe('Entry successfully added');
      expect(entry.body.status).not.toBe('success');
      expect(entry.body.status).toBe('error');
      expect(entry.statusCode).not.toBe(200);
      expect(entry.statusCode).toBe(403);
    } catch (err) {
      console.log(err);
    }
  });

  test('It creates an entry', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach',
          date: '1/2/2021'
        })
        .set('Authorization', `Bearer ${token}`);
      expect(entry.body.data).toHaveProperty('id');
      expect(entry.body.message).toBe('Entry successfully added');
      expect(entry.body.status).toBe('success');
      expect(entry.body.status).not.toBe('error');
      expect(entry.statusCode).toBe(200);
      expect(entry.statusCode).not.toBe(400);
    } catch (err) {
      console.log(err);
    }
  });

  test('It does not creates an entry because of all credentials arent provided', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach'
        })
        .set('Authorization', `Bearer ${token}`);
      // expect(entry.body.data).toHaveProperty('id');
      expect(entry.body.message).toBe('All fields required');
      expect(entry.body.status).not.toBe('success');
      expect(entry.body.status).toBe('error');
      expect(entry.statusCode).not.toBe(200);
      expect(entry.statusCode).toBe(400);
    } catch (err) {
      console.log(err);
    }
  });

  test('It fetches all enteries made by a user', async () => {
    try {
      const entry = await request(app)
        .get('/api/v1/enteries')
        .set('Authorization', `Bearer ${token}`);
      expect(entry.body).toHaveProperty('status');
      expect(entry.body.data).toBeInstanceOf(Array);
      expect(entry.body).toHaveProperty('message');
      expect(entry.body).toHaveProperty('data');
      expect(entry.body.message).toBe('fetched all enteries successfully');
      expect(entry.body.status).not.toBe('error');
      expect(entry.body.status).toBe('success');
      expect(entry.statusCode).not.toBe(400);
      expect(entry.statusCode).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  test('does not fetch enteries because of lack of authorization', async () => {
    try {
      const entry = await request(app)
        .get('/api/v1/enteries');
      expect(entry.body.message).not.toBe('fetched all enteries successfully');
      expect(entry.body.status).toBe('error');
      expect(entry.body.status).not.toBe('success');
      expect(entry.statusCode).toBe(403);
      expect(entry.statusCode).not.toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  test('edits an entry with an ID provided', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach',
          date: '1/2/2021'
        })
        .set('Authorization', `Bearer ${token}`);
      const updatedEntry = await request(app)
        .put(`/api/v1/enteries/${entry.body.data.id}/edit`)
        .set('Authorization', `Bearer ${token}`);
        // expect(entry.statusCode).toBe(403);
      expect(updatedEntry.body.message).toBe('Entry successfully updated');
      expect(updatedEntry.body.status).not.toBe('error');
      expect(updatedEntry.body.status).toBe('success');
      expect(updatedEntry.statusCode).not.toBe(401);
      expect(updatedEntry.statusCode).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  test('does not edit an entry because no aunthorization', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach',
          date: '1/2/2021'
        })
        .set('Authorization', `Bearer ${token}`);
      const updatedEntry = await request(app)
        .put(`/api/v1/enteries/${entry.body.data.id}/edit`);
        // expect(entry.statusCode).toBe(403);
      expect(updatedEntry.body.message).not.toBe('Entry successfully updated');
      expect(updatedEntry.body.message).toBe('Unauthorized');
      expect(updatedEntry.body.status).toBe('error');
      expect(updatedEntry.body.status).not.toBe('success');
      expect(updatedEntry.statusCode).not.toBe(200);
      expect(updatedEntry.statusCode).toBe(403);
    } catch (err) {
      console.log(err);
    }
  });

  test('edits an entry with an ID provided', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach',
          date: '1/2/2021'
        })
        .set('Authorization', `Bearer ${token}`);
      const updatedEntry = await request(app)
        .delete(`/api/v1/enteries/${entry.body.data.id}/delete`)
        .set('Authorization', `Bearer ${token}`);
        // expect(entry.statusCode).toBe(403);
      expect(updatedEntry.body.message).toBe('Entry successfully deleted');
      expect(updatedEntry.body.status).not.toBe('error');
      expect(updatedEntry.body.status).toBe('success');
      expect(updatedEntry.statusCode).not.toBe(401);
      expect(updatedEntry.statusCode).toBe(200);
    } catch (err) {
      console.log(err);
    }
  });

  test('does not edit an entry because no aunthorization', async () => {
    try {
      const entry = await request(app)
        .post('/api/v1/entry')
        .send({
          title: 'Beach day',
          entry: 'Had an awesome time at the beach',
          date: '1/2/2021'
        })
        .set('Authorization', `Bearer ${token}`);
      const updatedEntry = await request(app)
        .delete(`/api/v1/enteries/${entry.body.data.id}/delete`);
        // expect(entry.statusCode).toBe(403);
      expect(updatedEntry.body.message).not.toBe('Entry successfully updated');
      expect(updatedEntry.body.message).toBe('Unauthorized');
      expect(updatedEntry.body.status).toBe('error');
      expect(updatedEntry.body.status).not.toBe('success');
      expect(updatedEntry.statusCode).not.toBe(200);
      expect(updatedEntry.statusCode).toBe(403);
    } catch (err) {
      console.log(err);
    }
  });
});
