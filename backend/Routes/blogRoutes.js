const express = require('express')
// const { checkSchema } = require('express-validator')

const router = express.Router()
const {
  getAllBlogs,
  createBlog,
  updateBlog,
  getBlogById,
  deleteBlog,
  getByUserId,
} = require('../Controllers/blogController')

router.get('/getAllBlogs', getAllBlogs)

router.get('/getBlog/:id', getBlogById)
router.post('/createBlog', createBlog)

router.put('/updateBlog/:id', updateBlog)

router.delete('/deleteBlog/:id', deleteBlog)
router.get('/user/:id', getByUserId)

module.exports = router
