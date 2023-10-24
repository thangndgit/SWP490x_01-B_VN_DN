import express from 'express'
import { authController } from '../controllers/index.mjs'
import { authValidator } from '../validators/index.mjs'

const router = express.Router()

router.post('/login', authValidator.login, authController.login)
router.post('/register', authValidator.register, authController.register)

export default router
