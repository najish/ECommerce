const path = require('path')
const fs = require('fs')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const compression = require('compression')

module.exports = {
  path,
  fs,
  express,
  morgan,
  cors,
  bodyParser,
  mongoose,
  session,
  passport,
  compression,
}
