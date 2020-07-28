//logger for printing to the console

//for printing normal log messages
const info = (...params) => {
  console.log(...params)
}

//for printing error messages
const error = (...params) => {
  console.log(...params)
}

module.exports = {
  info, error
}