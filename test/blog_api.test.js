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


test('correct number of blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})