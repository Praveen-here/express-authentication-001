// Sample tests: run them with `npm test` from the backend folder.
// Your submission is graded against a larger set of hidden tests.
const request = require('supertest');
const app = require('../src/app');

describe('Login (sample)', () => {
  test('demo user can log in with the correct password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@test.com', password: 'password123' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('demo user cannot log in with a wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'demo@test.com', password: 'wrongpass' });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
