require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const sequelize = require('./utils/database')


const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const orderRoutes = require('./routes/orderRoutes')
const orderItemsRoutes = require('./routes/orderItemRoutes')
const cartRoutes = require('./routes/CartRoutes')
const cartItemsRoutes = require('./routes/cartItemRoutes')


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
app.use('/api/orders', orderRoutes)
app.use('/api/orderItems', orderItemsRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/cartItems', cartItemsRoutes)
app.use('/api/users', userRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}✅`)
})