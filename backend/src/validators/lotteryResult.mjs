import { body } from 'express-validator'
import { generateValidator } from './util.mjs'

const create = [
  body('openSession').trim().notEmpty().withMessage('Thiếu phiên mở thưởng'),

  body('lottery')
    .notEmpty()
    .withMessage('Thiếu id của loại xổ số')
    .isMongoId()
    .withMessage('Id loại xổ số không hợp lệ'),

  body('results')
    .notEmpty()
    .withMessage('Thiếu mảng kết quả')
    .isArray()
    .withMessage('Định dạng kết quả là một mảng lồng một mảng khác'),

  body('results.*')
    .notEmpty()
    .withMessage('Mảng kết quả của giải không được trống')
    .isArray()
    .withMessage('Định dạng kết quả của giải là một mảng'),

  body('results.*.*')
    .trim()
    .notEmpty()
    .withMessage('Kết quả mở thưởng không được trống'),
]

const update = [
  body('openSession').trim().optional(),

  body('lottery')
    .isMongoId()
    .withMessage('Id loại xổ số không hợp lệ')
    .optional(),

  body('results')
    .isArray()
    .withMessage('Định dạng kết quả là một mảng lồng một mảng khác')
    .optional(),

  body('results.*')
    .isArray()
    .withMessage('Định dạng kết quả của giải là một mảng')
    .optional(),

  body('results.*.*').trim().optional(),
]

export default {
  create: generateValidator(create),
  update: generateValidator(update),
}
