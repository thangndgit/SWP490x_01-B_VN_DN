import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
})

// Hash password before saving
userSchema.pre('save', function (next) {
  // Check if password is modified
  if (!this.isModified('password')) {
    return next()
  }
  // Hash password
  this.password = bcrypt.hashSync(this.password, 12)
  next()
})

// Method to check password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)
