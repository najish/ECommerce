// app.js
require('dotenv').config({ debug: false, override: false })

const { performance, PerformanceObserver } = require('perf_hooks')
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
const { connectMysql } = require('./utils/database')
const connectDB = require('./utils/mongoose')
const { connectRedis } = require('./utils')

// Measure boot time
const obs = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`🚀 Boot time: ${entry.duration.toFixed(2)} ms`)
  })
})
obs.observe({ entryTypes: ['measure'] })

performance.mark('start')

const PORT = process.env.PORT || 5000

async function startServer() {
  try {
    // Connect to DBs first
    console.log('🔄 Connecting to databases...')
    await Promise.all([connectDB(), connectMysql(), connectRedis()])
    console.log('✅ Databases connected')

    const app = express()

    // Force compression for testing (threshold: 0 means compress everything)
    app.use(compression({ threshold: 0 }))

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

    app.use(
      session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: true,
      })
    )

    // Passport setup
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
        (accessToken, refreshToken, profile, cb) => cb(null, profile)
      )
    )

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((obj, done) => done(null, obj))

    // Auth routes
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

    // API routes
    app.get('/', (req, res) => res.send('Welcome to the E-Commerce API'))
    app.use('/api', require('./routes'))
    app.use('/api/test', require('./routes/testRoutes'))
    app.use('/api/order', require('./routes/placeOrderRoutes'))

    // Test routes for compression
    app.get('/hello', (req, res) => res.send('hello world'))
    app.get('/big', (req, res) => {
      res.json({ data: 'x'.repeat(5000) }) // ~5KB payload
    })

    app.listen(PORT, () => {
      performance.mark('end')
      performance.measure('Boot Time', 'start', 'end')
      logger.info(`Server started on port: ${PORT}`)
    })
  } catch (err) {
    console.error('❌ Failed to start server:', err)
    process.exit(1)
  }
}

startServer()
