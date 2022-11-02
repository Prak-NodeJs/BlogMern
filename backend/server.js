const connectDB = require('./DbConfiguration/DB')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

connectDB().then(() => {
  console.log('connected to database')
})

const userRoutes = require('./Routes/userRoutes')
const blogRoutes = require('./Routes/blogRoutes')
app.use('/api', userRoutes)
app.use('/api', blogRoutes)

const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  console.log(`server started on port number ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`logged error:${err}`)
  server.close(() => process.exit(1))
})
