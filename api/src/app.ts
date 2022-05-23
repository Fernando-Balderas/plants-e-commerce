/* eslint @typescript-eslint/no-var-requires: "off" */
import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'

import userRouter from './routers/user'
import productRouter from './routers/product'
import orderRouter from './routers/order'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
const swaggerDocument = require('./docs/swagger-spec.json') // not using import due to an error
// import swaggerSpec from './config/swagger'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
