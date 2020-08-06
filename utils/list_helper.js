const dummy = (blogs) => {
  return 1
}

//The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
//reducer function- "sum" is the accumulator, "blog" is the currentValue, 0 is the optional initialValue
//return value is the total number of likes
const totalLikes = blogList => {
  return blogList
    .reduce((sum, blog) => sum + blog.likes, 0)
}


//The reduce() method executes a reducer function (that you provide) on each element of the array, resulting in single output value.
//reducer function- "max" is the accumulator, "blog" is the currentValue
//return value is the blog object with the highest number of likes
const favoriteBlog = blogList => {
  return blogList
    .reduce((max, blog) => blog.likes > max.likes ? blog : max)
}


//The Map object holds key-value pairs and remembers the original insertion order of the keys. 
//Any value (both objects and primitive values) may be used as either a key or a value.
//key -> author, value -> blogCount
//return value is the "max" object which shows the author with most number of blogs
const mostBlogs = blogList => {
  const map = new Map()
  blogList.forEach(blog => {
    const blogCount = map.get(blog.author) || 0
    map.set(blog.author, blogCount + 1)
  })

  let max = {
    author: undefined,
    blogs: 0
  }

  map.forEach((blogs, author) => {
    if(blogs > max.blogs) {
      max = {
        author,
        blogs
      }
    }
  })
  console.log(max)
  return max
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}