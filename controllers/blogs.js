//CONTROLLERS/BLOGS.JS -> all of the routes related to blogs in this directory

/*A router object is an isolated instance of middleware and routes.
You can think of it as a “mini-application,” capable only of performing middleware and routing functions.
Every Express application has a built-in app router.
A router behaves like middleware itself, so you can use it as an argument to app.use()
or as the argument to another router’s use() method.
The top-level express object has a Router() method that creates a new router object.
Once you’ve created a router object, you can add middleware and HTTP method routes
(such as get, put, post, and so on) to it just like an application.*/
const blogsRouter = require('express').Router()

//blog schema from blog.js (models)
const Blog = require('../models/blog')

//----------FETCH ALL BLOGS---------------
/*path in the route handler has shortened to ('/')
the router middleware was used to define "related routes"
defined in app.js -> app.use('/api/blogs', blogsRouter)*/
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//-------FETCH INDIVIDUAL BLOG----------
/*path in the route handler has shortened to ('/:id')
/the router middleware was used to define "related routes"
/defined in app.js -> app.use('/api/blogs', blogsRouter)*/
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


//------CREATE NEW BLOG-----------
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  /*blog constructor function to create blog object
  /properties match the Blog schema in model/blog.js*/
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  console.log('blog:', blog)

  const savedBlog = await blog.save()
  response.json(savedBlog)
})

//--------DELETE INDIVIDUAL BLOG----------
/*path in the route handler has shortened to ('/:id')
/the router middleware was used to define "related routes"
/defined in app.js -> app.use('/api/blogs', blogsRouter)*/
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//--------UPDATE INDIVIDUAL BLOG----------
blogsRouter.put('/:id', async (request, response) => {

  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})



module.exports = blogsRouter