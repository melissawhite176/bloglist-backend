require('dotenv').config()
const express = require('express')
const { request, response } = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/blog')

app.use(cors())

//built-in middleware to show static content
app.use(express.static('build'))

//json parser middleware
app.use(express.json())

//------------------------------------------------------

let blogs = [
  {
    id: 1,
    title: "Delicious Desserts Blog",
    author: "Joanna Goodman",
    url: "https://www.google.com",
    likes: 4
  },
  {
    id: 2,
    title: "Tasty Treats Blog",
    author: "Norton Oswald",
    url: "https://www.wikipedia.com",
    likes: 6
  },
  {
    id: 3,
    title: "DIY Furniture Blog",
    author: "Virginia Woolf",
    url: "https://www.fullstackopen.com",
    likes: 10
  }
]
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

app.get('/api/blogs/:id', (request, response) => {
  const id = Number(request.params.id)
  const blog = blogs.find(blog => {
    return blog.id === id
  })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

//----------------------------------------

app.delete('/api/blogs/:id', (request, response) => {
  const id = Number(request.params.id)
  blogs = blogs.filter(blog => blog.id !== id)

  response.status(204).end()
})

//------CREATE NEW BLOG-----------
app.post('/api/blogs', (request, response) => {
  const body = request.body

  if (!body.title || !body.author || !body.url || !body.likes) {
    return response.status(400).json({
      error: 'title, author, url, or number of likes missing'
    })
  }
  //blog constructor function to create blog object
  //properties match the Blog schema in model/blog.js
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  console.log('blog:', blog)

  
  blog.save().then(savedBlog => {
    response.json(savedBlog)
  })
})
//------------------------------------

//environment variable PORT or port 3001 
//if environment variable is undefined
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

//middleware that prints information about every request 
//that is sent to the server (middleware receives these three parameters)
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}
app.use(requestLogger)

//middleware used for catching requests made to non-existent routes
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)