import jwt from 'jsonwebtoken'
import HttpError from '../utils/HttpError.mjs'
import { User } from '../models/index.mjs'

const createToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  )
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).select('+password')

    // Check user exists
    if (!user) {
      const err = new HttpError(404, 'Tài khoản không tồn tại')
      return next(err, req, res, next)
    }

    // Check password correct
    if (!user.checkPassword(password)) {
      const err = new HttpError(401, 'Sai mật khẩu')
      return next(err, req, res, next)
    }

    // Send token to client
    res.status(200).json({
      status: 'OK',
      token: createToken(user),
      data: null,
    })
  } catch (error) {
    next(error)
  }
}

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    // Check if email exists
    if (await User.findOne({ email })) {
      return next(new HttpError(409, 'Email đã tồn tại'), req, res, next)
    }

    let user = await User.create({
      name,
      email,
      password,
      role,
    })
    user = JSON.parse(JSON.stringify(user))
    delete user.password

    res.status(201).json({
      status: 'CREATED',
      token: createToken(user),
      data: { ...user, password: undefined },
    })
  } catch (err) {
    next(err)
  }
}

export default {
  login,
  register,
}
