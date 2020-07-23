//MONGOOSE DEFINITIONS MOVED TO INDEX.JS FILE
//------------------------------------
// const mongoose = require('mongoose')

// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]

// const url =
//   `mongodb+srv://fullstack-bloglist:${password}@cluster0-klm2a.mongodb.net/bloglist-app?retryWrites=true&w=majority`

// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

// const blogSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number
// })

// const Blog = mongoose.model('Blog', blogSchema)

//GENERATE NEW BLOG
//-----------------

// const blog = new Blog({
//   title: 'Chris Crafts Blog',
//   author: 'Chris',
//   url: 'https://www.mongoosejs.com',
//   likes: 150
// })

// blog.save().then(result => {
//   console.log('blog saved!')
//   mongoose.connection.close()
// })

//PRINTS BLOGS STORED IN DATABASE
//----------------------------

// Blog.find({ author: 'Marie' }).then(result => {
//   result.forEach(blog => {
//     console.log(blog)
//   })
//   mongoose.connection.close()
// })