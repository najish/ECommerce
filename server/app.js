// app.js

require('dotenv').config({ debug: false, override: false })

const path = require('path')
const {
  express,
  cors,
  morgan,
  bodyParser,
  passport,
  session,
  compression,
} = require('./utils/packages')
const { Strategy: GoogleStrategy } = require('passport-google-oauth20')
const { logger } = require('./utils')
const sequelize = require('./utils/database')
const connectDB = require('./utils/mongoose')

const app = express()
const port = process.env.PORT || 5000

// Connect to DBs
connectDB() // MongoDB
// await sequelize.authenticate(); // Optional

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
  res.removeHeader('Cross-Origin-Opener-Policy')
  res.removeHeader('Cross-Origin-Embedder-Policy')
  next()
})
// app.use(compression())

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
)

// Passport
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        'http://localhost:5000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile)
    }
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

// Auth Routes
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(
      process.env.CLIENT_REDIRECT_URL || 'http://localhost:3000/profile'
    )
  }
)
app.get('/auth/user', (req, res) => res.send(req.user || null))
app.get('/auth/logout', (req, res) => {
  req.logout(() =>
    res.redirect(process.env.CLIENT_REDIRECT_URL || 'http://localhost:3000')
  )
})

// API Routes
app.get('/', (req, res) => res.send('Welcome to the E-Commerce API'))
app.use('/api', require('./routes'))
app.use('/api/test', require('./routes/testRoutes'))
app.use('/api/order', require('./routes/placeOrderRoutes'))

app.get('/hello', (req, res) => {
  return res.send('hello world')
})

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port} ✅`)
  logger.info(`Server started on port: ${port}`)
})
