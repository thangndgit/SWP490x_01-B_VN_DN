import { Lottery } from '../models/index.mjs'
import base from './base.mjs'

export default {
  getAll: base.getAll(Lottery),
  create: base.create(Lottery),
  getById: base.getById(Lottery),
  updateById: base.updateById(Lottery),
  deleteById: base.deleteById(Lottery),
}
