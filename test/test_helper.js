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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}