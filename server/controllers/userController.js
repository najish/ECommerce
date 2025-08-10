const { User } = require('../models')
const { getRedisClient } = require('../utils')

// Create a helper to clear related caches
async function clearUserCache(redisClient, userId = null) {
  await redisClient.del('users:all')
  if (userId) {
    await redisClient.del(`users:${userId}`)
  }
}

// CREATE
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)

    // Clear list cache
    const redisClient = getRedisClient()
    await clearUserCache(redisClient)

    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error })
  }
}

// READ - ALL
const getUsers = async (req, res) => {
  try {
    const cacheKey = 'users:all'
    const redisClient = getRedisClient()

    const cached = await redisClient.get(cacheKey)
    if (cached) {
      console.log('✅ Serving users from Redis cache')
      return res.status(200).json(JSON.parse(cached))
    }

    const users = await User.findAll()
    await redisClient.set(cacheKey, JSON.stringify(users), { EX: 60 })
    console.log('💾 Stored users in Redis cache')

    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
}

// READ - BY ID
const getUserById = async (req, res) => {
  try {
    const redisClient = getRedisClient()
    const cacheKey = `users:${req.params.id}`

    const cached = await redisClient.get(cacheKey)
    if (cached) {
      console.log(`✅ Serving user ${req.params.id} from Redis cache`)
      return res.status(200).json(JSON.parse(cached))
    }

    const user = await User.findByPk(req.params.id)
    if (user) {
      await redisClient.set(cacheKey, JSON.stringify(user), { EX: 60 })
      console.log(`💾 Stored user ${req.params.id} in Redis cache`)
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error })
  }
}

// UPDATE
const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    })

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id)

      const redisClient = getRedisClient()
      await clearUserCache(redisClient, req.params.id)

      res.status(200).json(updatedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error })
  }
}

// DELETE
const deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    })

    if (deleted) {
      const redisClient = getRedisClient()
      await clearUserCache(redisClient, req.params.id)

      res.status(204).send()
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
}
