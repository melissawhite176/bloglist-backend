//Defines the Mongoose schema for blogs
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

//blog schema with validation middleware
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true
  },
  author: {
    type: String,
    minlength: 2,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: false,
    default: 0
  }
})

//formats id property object to string,
//and removes versioning field
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


//node modules defined by setting value to module.exports variable
module.exports = mongoose.model('Blog', blogSchema)