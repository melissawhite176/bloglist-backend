const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verify that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
  expect(response.body[1].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Carla\'s Computer Blog',
    author: 'Carla',
    url: 'https://www.developer.mozilla.org/en-US/',
    likes: 200,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'Carla\'s Computer Blog'
  )
})

test('a blog without likes defaults to zero likes', async () => {
  const newBlog = {
    title: 'Gabe\'s Tech Gadgets Blog',
    author: 'Gabe',
    url: 'https://www.developer.mozilla.org/en-US/',
  }

  const FIXED_ID = 'fixed-id'

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(res => {
      res.body.id = FIXED_ID
    })
    .expect(200, {
      id: FIXED_ID,
      likes: 0,
      ...newBlog
    })
})

test('a blog with missing title and url properties is not added', async () => {
  const newBlog = {
    author: 'Gabe',
    likes: 150,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('a single blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  console.log('blogsAtStart:', blogsAtStart)
  console.log('blogToDelete:', blogToDelete)

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
  mongoose.connection.close()
})