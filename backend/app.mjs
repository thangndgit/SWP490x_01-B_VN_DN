import hpp from 'hpp'
import xss from 'xss-clean'
import cors from 'cors'
import helmet from 'helmet'
import express from 'express'
import rateLimit from 'express-rate-limit'
import swaggerUI from 'swagger-ui-express'
import bodyParser from 'body-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import mongoSanitize from 'express-mongo-sanitize'

import HttpError from './src/utils/HttpError.mjs'
import { globalErrorHandler } from './src/middlewares/error.mjs'
import {
  authRoutes,
  lotteryCheckHistoryRoutes,
  lotteryResultRoutes,
  lotteryRoutes,
  userRoutes,
} from './src/routes/index.mjs'

// Config swagger
const swaggerSpecs = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LotteryVN API',
      version: '1.0.0',
      description: 'API của website xem kết quả xổ số miền Bắc',
    },
  },
  apis: ['swagger.yaml'],
})

// Create app
const app = express()

// Allow CORS
app.use(cors())

// Set security HTTP headers
app.use(helmet())

// Limit requests from the same IP
app.use(
  '/api',
  rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP. Please try again in an hour',
  })
)

// Parse json data from request body
app.use(bodyParser.json({ limit: '15kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(hpp())

// Swagger route
app.use('/api-docs/v1/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

// Main routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/lotteries', lotteryRoutes)
app.use('/api/v1/lottery-results', lotteryResultRoutes)
app.use('/api/v1/lottery-check-histories', lotteryCheckHistoryRoutes)

// Undefined routes
app.use('*', (req, res, next) => {
  const err = new HttpError(404, 'Đường dẫn không hợp lệ')
  next(err, req, res, next)
})

// Handle errors
app.use(globalErrorHandler)

export default app
