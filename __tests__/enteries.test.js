const request = require('supertest');

const db = require('../src/database/db');

const app = require('../app');

let token;

beforeAll((done) => {
  request(app)
    .post('/api/v1/login')
    .send({
      email: 'amakaumeh@gmail.com',
      password: 'password',
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

afterEach(async () => {
  await db.query('DELETE FROM enteries');
});

describe('GET /api/v1/enteries', () => {
  test('It responds with an array of enteries', async () => {
    const response = await request(app)
      .get('/api/v1/enteries')
      .set('Authorization', `Bearer ${token}`)
      .then((data) => {
        expect(data.statusCode).toBe(200);
        expect(data.type).toBe('application/json');
      });
  });
});

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/v1/entry')
      .set('Authorization', `Bearer ${token}`)``
      .send({
        user_id: 1,
        title: 'test',
        entry: 'hey your ass better pass',
        date: '1/2/2021'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
  });
});