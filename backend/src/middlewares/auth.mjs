import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import { User } from '../models/index.mjs'
import HttpError from '../utils/HttpError.mjs'

export const requireLogin = async (req, res, next) => {
  try {
    let token

    // Check if token exists on headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
      const err = new HttpError(
        401,
        'UNAUTHORIZED',
        'Bạn cần đăng nhập để truy cập nội dung này'
      )
      return next(err, req, res, next)
    }

    // Check if user exists
    const { id } = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    const user = await User.findById(id)
    if (!user) {
      const err = new HttpError(401, 'UNAUTHORIZED', 'Người dùng không tồn tại')
      return next(err, req, res, next)
    }

    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

export const requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const err = new HttpError(
        403,
        'FORBIDDEN',
        'Bạn không có quyền truy cập nội dung này'
      )
      return next(err, req, res, next)
    }
    next()
  }
}
