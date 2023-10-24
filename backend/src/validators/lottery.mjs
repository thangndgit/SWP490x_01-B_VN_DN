import { body } from 'express-validator'
import { generateValidator } from './util.mjs'

const create = [
  body('name').trim().notEmpty().withMessage('Thiếu tên'),

  body('code')
    .notEmpty()
    .withMessage('Thiếu mã')
    .isLength({ min: 4, max: 8 })
    .withMessage('Mã phải có từ 5 tới 8 ký tự'),

  body('ticketPrice')
    .notEmpty()
    .withMessage('Thiếu giá vé')
    .isFloat({ gt: 0 })
    .withMessage('Giá vé phải là số dương'),

  body('prizes')
    .notEmpty()
    .withMessage('Thiếu các giá trị tiền thưởng')
    .isArray()
    .withMessage('Các giá trị tiền thưởng phải đặt trong 1 mảng'),

  body('prizes.*')
    .isFloat({ gt: 0 })
    .withMessage('Giải thưởng phải là số dương')
    .notEmpty()
    .withMessage('Thiếu giá trị tiền thưởng'),
]

const update = [
  body('name').trim().optional(),

  body('code')
    .isLength({ min: 4, max: 8 })
    .withMessage('Mã phải có từ 5 tới 8 ký tự')
    .optional(),

  body('ticketPrice')
    .isFloat({ gt: 0 })
    .withMessage('Giá vé phải là số dương')
    .optional(),

  body('prizes.*')
    .isFloat({ gt: 0 })
    .withMessage('Giải thưởng phải là số dương')
    .optional(),
]

export default {
  create: generateValidator(create),
  update: generateValidator(update),
}
