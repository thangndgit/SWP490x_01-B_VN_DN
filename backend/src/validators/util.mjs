import { validationResult } from 'express-validator'
import HttpError from '../utils/HttpError.mjs'

export const generateValidator = (validations) => {
  return async (req, res, next) => {
    // Run validation
    for (let validation of validations) {
      const result = await validation.run(req)
      if (result.errors.length) break
    }

    // Get first error
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const firstErr = new HttpError(400, errors.array()[0].msg)
      return next(firstErr, req, res, next)
    }

    next()
  }
}
