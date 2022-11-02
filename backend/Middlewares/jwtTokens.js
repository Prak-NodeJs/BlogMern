const jwt = require('jsonwebtoken')
const genrateToken = async (id) => {
  const token = jwt.sign(id, config.JWT_SCERET_KEY)
}
