import express from 'express'
import { lotteryController } from '../controllers/index.mjs'
import { requireLogin, requireRoles } from '../middlewares/auth.mjs'
import { lotteryValidator } from '../validators/index.mjs'

const router = express.Router()

// Need to login as admin to access routes
router.use(requireLogin)
router.use(requireRoles('admin'))

router.get('/', lotteryController.getAll)
router.post('/', lotteryValidator.create, lotteryController.create)
router.get('/:id', lotteryController.getById)
router.put('/:id', lotteryValidator.update, lotteryController.updateById)
router.delete('/:id', lotteryController.deleteById)

export default router
