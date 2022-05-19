import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import movieRouter from './routers/movie'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/api/v1/movies', movieRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
