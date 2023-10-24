import { LotteryResult } from '../models/index.mjs'
import base from './base.mjs'

export default {
  getAll: base.getAll(LotteryResult),
  create: base.create(LotteryResult),
  getById: base.getById(LotteryResult),
  updateById: base.updateById(LotteryResult),
  deleteById: base.deleteById(LotteryResult),
}
