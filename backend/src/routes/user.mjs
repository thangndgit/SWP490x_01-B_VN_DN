import express from 'express'
import { userController } from '../controllers/index.mjs'
import { requireLogin, requireRoles } from '../middlewares/auth.mjs'
import { userValidator } from '../validators/index.mjs'

const router = express.Router()

// Need to login to access routes
router.use(requireLogin)
router.get('/:id', userController.getById)
router.put('/:id', userValidator.update, userController.updateById)

// Need to have admin role to access routes
router.use(requireRoles('admin'))
router.get('/', userController.getAll)
router.post('/', userValidator.update, userController.create)
router.delete('/:id', userController.deleteById)

export default router
