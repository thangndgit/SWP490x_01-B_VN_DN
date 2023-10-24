import { body } from 'express-validator'
import { generateValidator } from './util.mjs'

const login = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Thiếu email')
    .isEmail()
    .withMessage('Email không hợp lệ'),

  body('password').notEmpty().withMessage('Thiếu mật khẩu'),
]

const register = [
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

export default {
  login: generateValidator(login),
  register: generateValidator(register),
}
