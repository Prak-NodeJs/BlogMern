const express = require('express')
const { checkSchema } = require('express-validator')

const router = express.Router()
const {
  createUser,
  loginUser,
  getAllUsers,
  deleteUser,
} = require('../Controllers/userController')

const userValidator = require('../Validations/userValidation')

router.post('/user/register', userValidator.register, createUser)

router.post('/user/login', userValidator.login, loginUser)

router.get('/getAllUsers', getAllUsers)

router.delete('/deleteUser/id', deleteUser)

module.exports = router
