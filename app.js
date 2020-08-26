//app.js creates the actual application and connects to the database
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

//-----CONNECTION TO MONGODB------------
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })
//---------------------------------------
//cross origin resource sharing
app.use(cors())
//built-in middleware to show static content
app.use(express.static('build'))
//json parser middleware
app.use(express.json())
//request logger middleware
app.use(middleware.requestLogger)

//defining router for blogs route (controllers/blogs.js)
app.use('/api/blogs', blogsRouter)

//unknown endpoint middleware
app.use(middleware.unknownEndpoint)
//error handler middleware
app.use(middleware.errorHandler)

module.exports = app



