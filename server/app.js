require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./utils/database')


const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')


app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API')
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}✅`)
})