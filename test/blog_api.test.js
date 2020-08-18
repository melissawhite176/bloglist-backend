const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Mary\'s Makeup Blog',
    author: 'Mary',
    url: 'https://www.fullstackopen.com/en',
    likes: 100,
  },
  {
    title: 'Gary Gardening Blog',
    author: 'Gary',
    url: 'https://www.developer.mozilla.org/en-US/',
    likes: 101,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
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

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).toContain(
    'Carla\'s Computer Blog'
  )
})

afterAll(() => {
  mongoose.connection.close()
})