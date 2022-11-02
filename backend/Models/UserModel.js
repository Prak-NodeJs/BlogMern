const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },
  password: {
    type: String,
  },

  blogs: [{ type: mongoose.Types.ObjectId, ref: 'Blog' }],
})

const User = new mongoose.model('User', userSchema)

module.exports = User
