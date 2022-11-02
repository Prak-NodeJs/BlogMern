const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
})

const Blog = new mongoose.model('Blog', blogSchema)

module.exports = Blog
