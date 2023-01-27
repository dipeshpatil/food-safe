const express = require('express')
const config = require('config')

const connectDB = require('./config/database')

const substanceRoute = require('./routes/api/substance')
const authRoute = require('./routes/api/auth')
const userRoute = require('./routes/api/user')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json({extended: false}))

app.get('/', (req, res) => res.send('API Running'))

// Define Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/substance', substanceRoute)

const PORT = process.env.PORT || config.get('app.serverPort') || 3001
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
