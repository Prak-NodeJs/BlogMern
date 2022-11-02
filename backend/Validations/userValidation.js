const { check, validationResult } = require('express-validator')

const userRegisterValidation = () => [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Minimum 3 characters required!')
    .bail(),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email name can not be empty!')
    .bail()
    .isEmail()
    .withMessage('Invalid email address!'),
]

const userLoginValidation = () => [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email name can not be empty!')
    .bail()
    .isEmail()
    .withMessage('Invalid email address!'),
]

const reporter = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'validationError',

      message: errors.array(),
    })
  }

  next()
}

module.exports = {
  register: [userRegisterValidation(), reporter],

  login: [userLoginValidation(), reporter],
}
