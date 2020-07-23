require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')

//built-in middleware to show static content
app.use(express.static('build'))

//json parser middleware
app.use(express.json())

//cross-origin resource sharing
app.use(cors())

//------------------------------------------------------

//----------FETCH ALL BLOGS---------------

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})
//------------------------------------------

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//-------FETCH INDIVIDUAL BLOG----------

app.get('/api/blogs/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

//--------DELETE INDIVIDUAL BLOG----------

app.delete('/api/blogs/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


//------CREATE NEW BLOG-----------
app.post('/api/blogs', (request, response, next) => {
  const body = request.body

  //blog constructor function to create blog object
  //properties match the Blog schema in model/blog.js
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  console.log('blog:', blog)


  blog
    .save()
    .then(savedBlog => savedBlog.toJSON())
    .then(savedAndFormattedBlog => {
      response.json(savedAndFormattedBlog)
    })
    .catch(error => next(error))
})


//-------------------------------------
//environment variable PORT or port 3001 if environment variable is undefined
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//-------------------------------------
//middleware that prints information about every request that is
//sent to the server (middleware receives these three parameters)
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

//-------------------------------------
//middleware used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//-----------ERROR HANDLER--------------
//check if the error is a CastError exception (ex: invalid object id for Mongo)
//in all other error situations,
//the middleware will pass the error forward to the default Express error handler
const errorHandler = (error, request, response, next) => {
  console.log('error.name:', error.name)
  console.log('error message:', error.message)

  if (error.name === 'CastError') {
    return response.status(400)
      .json({ errorname: error.name, error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400)
      .json({ errorname: error.name, error: error.message })
  }

  next(error)
}

app.use(errorHandler)
//-------------------------------------