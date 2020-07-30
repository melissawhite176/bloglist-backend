//custom middleware

//logger for printing to console
const logger = require('./logger')

//----------REQUEST LOGGER-----------
//middleware that prints information about every request that is
//sent to the server (middleware receives these three parameters)
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path: ', request.path)
  logger.info('Body: ', request.body)
  logger.info('---')
  next()
}

//----------UNKNOWN ENDPOINT------------
//middleware used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

//-----------ERROR HANDLER--------------
//check if the error is a CastError exception (ex: invalid object id for Mongo)
//in all other error situations,
//the middleware will pass the error forward to the default Express error handler
const errorHandler = (error, request, response, next) => {
  logger.info('error.name:', error.name)
  logger.info('error message:', error.message)

  if (error.name === 'CastError') {
    return response.status(400)
      .json({ errorname: error.name, error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400)
      .json({ errorname: error.name, error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}

