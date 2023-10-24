export const globalErrorHandler = (err, req, res, next) => {
  const status = err.status || 'INTERNAL_SERVER_ERROR'
  const statusCode = err.statusCode || 500
  const message = err.message || 'Có lỗi xảy ra'

  res.status(statusCode).json({
    error: { status, statusCode },
    message,
  })

  next(req, res, next)
}
