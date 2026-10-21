require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieparser = require('cookie-parser')

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json())
app.use(cookieparser())


const PORT = process.env.PORT || 5000

let server

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: process.env.NODE_ENV !== 'production',
        })

        console.log('connected to MongoDB')

        server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    } catch (err) {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    }
}

startServer()