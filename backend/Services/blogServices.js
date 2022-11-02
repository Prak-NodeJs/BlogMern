const Blog = require('../Models/Blog')
exports.getAllBlogs = async (data) => {
  try {
    return await Blog.find({}).populate('user')
  } catch (err) {
    return err
  }
}
