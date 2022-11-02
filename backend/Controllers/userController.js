const User = require('../Models/UserModel')
const { use } = require('../Routes/userRoutes')
const bcrypt = require('bcrypt')
const {
  createUser,
  isEmailExist,
  getUserByEmail,
  genratehash,
  comparePassword,
  getAllUsers,
  deleteUser,
} = require('../Services/userServices')
const responseHelper = require('../utils/errorResponse')
const messageHelper = require('../utils/responseMessages')

exports.createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const emailExist = await isEmailExist(email)
    if (emailExist) {
      return responseHelper.badRequestError(
        res,
        messageHelper.registration.emailIdAlreadyExists,
      )
    }

    const hashPassword = await genratehash(password)

    const data = {
      name: name,
      email: email,
      password: hashPassword,
      blogs: [],
    }

    const user = await createUser(data)
    return responseHelper.success(res, messageHelper.registration.success)
  } catch (err) {
    next(err)
  }
}

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    if (!user) {
      return responseHelper.badRequestError(
        res,
        messageHelper.login.Loginfailed,
      )
    }

    const loginresult = comparePassword(password, user.password)
    if (loginresult) {
      res.status(200).json({
        message: 'login suxee',
        user: user,
      })
    } else {
      return responseHelper.badRequestError(
        res,
        messageHelper.login.Loginfailed,
      )
    }
  } catch (err) {
    next(err)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const user = await getAllUsers()

    return responseHelper.sucessRes(res, user)
  } catch (err) {
    next(err)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.query.id
    const user = await deleteUser(id)
    if (!user) {
      return responseHelper.notFound(messageHelper.user.UserNotFound)
    }
    return responseHelper.success(res, messageHelper.user.UserDeleted)
  } catch (err) {
    next(err)
  }
}
