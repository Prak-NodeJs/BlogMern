const { default: mongoose } = require('mongoose')
const Blog = require('../Models/Blog')
const User = require('../Models/UserModel')
const { getAllBlogs } = require('../Services/blogServices')
exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await getAllBlogs()
    res.status(200).json({ blogs })
  } catch (err) {
    console.log(err)
  }
}

exports.createBlog = async (req, res, next) => {
  try {
    const { title, description, image, user } = req.body
    let existingUser
    try {
      existingUser = await User.findById(user)
    } catch (err) {
      console.log(err)
    }
    if (!existingUser) {
      return res.status(404).json({ message: 'user not found' })
    }
    const blog = new Blog({
      title,
      description,
      image,
      user,
    })
    try {
      const session = await mongoose.startSession()
      session.startTransaction()
      await blog.save({ session })
      existingUser.blogs.push(blog)
      await existingUser.save({ session })
      await session.commitTransaction()

      res.send(blog)
    } catch (err) {
      console.log(err)
    }
  } catch (err) {
    console.log(err)
  }
}

exports.updateBlog = async (req, res, next) => {
  const { title, description } = req.body
  const blogId = req.params.id
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    })

    res.status(200).json({
      status: 'success',
      data: blog,
    })
    if (!blog) {
      res.send('error')
    }
  } catch (err) {
    console.log(err)
  }
}

exports.getBlogById = async (req, res, next) => {
  try {
    const id = req.params.id

    const blog = await Blog.findById(id)
    if (!blog) {
      res.status(404).json({
        message: 'Blog not found',
      })
    }
    res.status(200).json({
      blogs: blog,
    })
  } catch (err) {
    console.log(err)
  }
}

exports.deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.id

    const blog = await Blog.findByIdAndRemove(id).populate('user')
    await blog.user.blogs.pull(blog)
    await blog.user.save()
    if (!blog) {
      res.status(404).json({
        message: 'Blog not found',
      })
    }
    res.status(200).json({
      blogs: 'succesfully deleted',
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id
    const blog = await User.findById(userId).populate('blogs')
    if (!blog) {
      res.status(404).json({
        message: 'user not found',
      })
    }
    res.status(200).json({ blog })
  } catch (err) {
    console.log(err)
  }
}
