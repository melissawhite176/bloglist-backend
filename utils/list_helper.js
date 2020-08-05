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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}