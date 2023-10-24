import { Schema, model } from 'mongoose'

const lotteryCheckHistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    lotteryResult: {
      type: Schema.Types.ObjectId,
      ref: 'LotteryResult',
      required: true,
    },

    openSession: {
      type: String,
      required: true,
      trim: true,
    },

    ticket: {
      type: String,
      required: true,
      trim: true,
    },

    prizesWon: [
      {
        name: { type: String, required: true, trim: true },
        prize: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
)

export default model('LotteryCheckHistory', lotteryCheckHistorySchema)
