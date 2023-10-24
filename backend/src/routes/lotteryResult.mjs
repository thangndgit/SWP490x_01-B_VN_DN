import express from 'express'
import { requireLogin, requireRoles } from '../middlewares/auth.mjs'
import { lotteryResultController } from '../controllers/index.mjs'
import { lotteryResultValidator } from '../validators/index.mjs'

const router = express.Router()

// Need to login as admin to access routes
router.use(requireLogin)
router.use(requireRoles('admin'))

router.get('/', lotteryResultController.getAll)
router.post('/', lotteryResultValidator.create, lotteryResultController.create)
router.get('/:id', lotteryResultController.getById)
router.put(
  '/:id',
  lotteryResultValidator.update,
  lotteryResultController.updateById
)
router.delete('/:id', lotteryResultController.deleteById)

export default router
