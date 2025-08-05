const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('mydatabase', 'user', 'userpassword', {
  host: 'mysql',
  dialect: 'mysql',
  timezone: '+05:30',
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully. ✅')
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
