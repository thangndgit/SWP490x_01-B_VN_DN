import { body } from 'express-validator'
import { generateValidator } from './util.mjs'

const create = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Thiếu email')
    .isEmail()
    .withMessage('Email không hợp lệ'),
  body('password')
    .notEmpty()
    .withMessage('Thiếu mật khẩu')
    .isLength({ min: 8, max: 30 })
    .withMessage('Mật khẩu phải có từ 8 tới 30 ký tự'),
  body('name').trim().notEmpty().withMessage('Thiếu tên'),
  body('role').trim().notEmpty().withMessage('Thiếu vai trò'),
]

const update = [
  body('name').trim().optional(),
  body('password')
    .isLength({ min: 8, max: 30 })
    .withMessage('Mật khẩu phải có từ 8 tới 30 ký tự')
    .optional(),
]

export default {
  create: generateValidator(create),
  update: generateValidator(update),
}
