const supertest = require('supertest');
const app = require('../app');

describe('E-Commerce API', () => {
  it('should return a welcome message on the root endpoint', async () => {
    const response = await supertest(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Welcome to the E-Commerce API');
  });

  it('should respond to auth routes', async () => {
    const response = await supertest(app).get('/api/auth');
    expect(response.statusCode).toBe(404); // Assuming no specific route is defined yet
  });

  it('should respond to product routes', async () => {
    const response = await supertest(app).get('/api/products');
    expect(response.statusCode).toBe(404); // Assuming no specific route is defined yet
  });
});
