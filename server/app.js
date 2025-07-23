require('dotenv').config();
const {express, path, morgan, cors, bodyParser} = require('./utils/packages')
const app = express()
const port = process.env.PORT || 5000
const sequelize = require('./utils/database')


const routes = require('./routes')


const testRoutes = require('./routes/testRoutes')
const placeOrderRoutes = require('./routes/placeOrderRoutes')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to the E-Commerce API')
})

app.use('/api',routes)
app.use('/api/test', testRoutes)
app.use('/api/placeOrder', placeOrderRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}✅`)
})