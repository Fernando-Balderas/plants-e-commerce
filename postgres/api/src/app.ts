import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
// import passport from "passport";
// import swaggerUi from "swagger-ui-express";
// import lusca from 'lusca' will be used later

import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
// import swaggerDocument from "./docs/swagger-spec.json";
// import swaggerSpec from './config/swagger'
// import googleLoginStrategy from "./config/passportGoogle";
import userRouter from './routers/user'
import productRouter from './routers/product'
import orderRouter from './routers/order'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())
// app.use(passport.initialize());
// passport.use(googleLoginStrategy());

// Set up routers
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/', (req, res) => res.json({ app: 'plants-e-commerce pg demo' }))

// Custom API error handler
app.use(apiErrorHandler)

export default app
