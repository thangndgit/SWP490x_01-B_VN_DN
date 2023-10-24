import { LotteryCheckHistory } from '../models/index.mjs'
import base from './base.mjs'

export default {
  getAll: base.getAll(LotteryCheckHistory),
  create: base.create(LotteryCheckHistory),
  getById: base.getById(LotteryCheckHistory),
  updateById: base.updateById(LotteryCheckHistory),
  deleteById: base.deleteById(LotteryCheckHistory),
}
