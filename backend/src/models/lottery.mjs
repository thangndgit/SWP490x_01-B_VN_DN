import mongoose from 'mongoose'

const lotterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  code: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  },

  ticketPrice: {
    type: Number,
    required: true,
  },

  prizes: [
    {
      type: Number,
      required: true,
    },
  ],

  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
})

export default mongoose.model('Lottery', lotterySchema)
