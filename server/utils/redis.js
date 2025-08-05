const redis = require('redis')

const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379',
  legacyMode: true, // for compatibility with connect-redis
})

redisClient.connect().catch(console.error)

redisClient.on('connect', () => {
  console.log('✅ Redis connected')
})

redisClient.on('error', (err) => {
  console.error('❌ Redis error:', err)
})

module.exports = redisClient
