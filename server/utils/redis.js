// redisClient.js
const redis = require('redis')

let redisClient

async function connectRedis() {
  if (redisClient) return redisClient // already connected

  redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    legacyMode: true,
  })

  redisClient.on('connect', () => {
    console.log('✅ Redis connected')
  })

  redisClient.on('error', (err) => {
    console.error('❌ Redis error:', err)
  })

  try {
    await redisClient.connect()
  } catch (error) {
    console.error('❌ Failed to connect to Redis:', error)
    throw error
  }

  return redisClient
}

function getRedisClient() {
  if (!redisClient) {
    throw new Error('Redis client not connected. Call connectRedis() first.')
  }
  return redisClient
}

module.exports = { connectRedis, getRedisClient }
