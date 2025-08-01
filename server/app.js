require('dotenv').config();
const { express, path, morgan, cors, bodyParser } = require('./utils/packages');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const port = process.env.PORT || 5000;

const sequelize = require('./utils/database');
const connectDB = require('./utils/mongoose')
const routes = require('./routes');
const testRoutes = require('./routes/testRoutes');
const placeOrderRoutes = require('./routes/placeOrderRoutes');
const {logger} = require('./utils')

connectDB()

// 🔧 Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors())

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.removeHeader("Cross-Origin-Opener-Policy");
  res.removeHeader("Cross-Origin-Embedder-Policy");
  next();
});

// 🔐 Session
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true
}));

// 🔐 Passport Setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, (accessToken, refreshToken, profile, cb) => {
  // Save or process user here if needed
  return cb(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// 🔗 Auth Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => res.redirect("http://localhost:3000/profile")
);

app.get("/auth/user", (req, res) => {
  res.send(req.user || null);
});

app.get("/auth/logout", (req, res) => {
  req.logout(() => res.redirect("http://localhost:3000"));
});

// ✅ API Routes
app.get('/', (req, res) => res.send('Welcome to the E-Commerce API'));
app.use('/api', routes);
app.use('/api/test', testRoutes);
app.use('/api/order', placeOrderRoutes);

// 🚀 Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port} ✅`);
  logger.info(`server started at : ${port}`)
});
