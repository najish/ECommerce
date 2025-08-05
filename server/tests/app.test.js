const request = require('supertest')
const app = require('../app') // Do NOT import server.js

describe('E-Commerce API', () => {
  it('should return a welcome message on the root endpoint', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
    expect(response.text).toBe('Welcome to the E-Commerce API')
  })

  it('should return 404 for auth route if not defined', async () => {
    const response = await request(app).get('/api/auth')
    expect(response.statusCode).toBe(404)
  })
})
