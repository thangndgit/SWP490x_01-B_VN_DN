import { body } from 'express-validator'
import { generateValidator } from './util.mjs'

const create = [
  body('ticket').trim().notEmpty().withMessage('Thiếu thông tin vé đã mua'),
  body('openSession').trim().notEmpty().withMessage('Thiếu phiên mở thưởng'),

  body('user')
    .notEmpty()
    .withMessage('Id người dùng không được trống')
    .isMongoId()
    .withMessage('Id nguời dùng không hợp lệ'),

  body('lotteryResult')
    .notEmpty()
    .withMessage('Id vé dò không được trống')
    .isMongoId()
    .withMessage('Id vé dò không hợp lệ'),

  body('prizesWon')
    .isArray()
    .withMessage('Định dạng các giải đã trúng là một mảng'),

  body('prizesWon.name').trim().optional(),

  body('prizesWon.prize')
    .isFloat({ gt: 0 })
    .withMessage('Giá trị giải thưởng phải là một số dương')
    .optional(),
]

const update = [
  body('ticket').trim().optional(),
  body('openSession').trim().optional(),

  body('user').isMongoId().withMessage('Id nguời dùng không hợp lệ').optional(),

  body('lotteryResult')
    .isMongoId()
    .withMessage('Id vé dò không hợp lệ')
    .optional(),

  body('prizesWon')
    .isArray()
    .withMessage('Định dạng các giải đã trúng là một mảng')
    .optional(),

  body('prizesWon.name').trim().optional(),

  body('prizesWon.prize')
    .isFloat({ gt: 0 })
    .withMessage('Giá trị giải thưởng phải là một số dương')
    .optional(),
]

export default {
  create: generateValidator(create),
  update: generateValidator(update),
}
