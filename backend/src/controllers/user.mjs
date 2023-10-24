import { User } from '../models/index.mjs'
import base from './base.mjs'

export default {
  getAll: base.getAll(User),
  create: base.create(User),
  getById: base.getById(User),
  updateById: base.updateById(User),
  deleteById: base.deleteById(User),
}
