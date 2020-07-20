//EXTRACT MONGOOSE SPECIFIC CODE INTO ITS OWN MODULE
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })

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
    required: true
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