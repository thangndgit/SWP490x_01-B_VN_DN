import express from 'express'
import { requireLogin, requireRoles } from '../middlewares/auth.mjs'
import { lotteryCheckHistoryController } from '../controllers/index.mjs'
import { lotteryCheckHistoryValidator } from '../validators/index.mjs'

const router = express.Router()

// Need to login as admin to access routes
router.use(requireLogin)
router.use(requireRoles('admin'))

router.get('/', lotteryCheckHistoryController.getAll)
router.post(
  '/',
  lotteryCheckHistoryValidator.create,
  lotteryCheckHistoryController.create
)
router.get('/:id', lotteryCheckHistoryController.getById)
router.put(
  '/:id',
  lotteryCheckHistoryValidator.update,
  lotteryCheckHistoryController.updateById
)
router.delete('/:id', lotteryCheckHistoryController.deleteById)

export default router
