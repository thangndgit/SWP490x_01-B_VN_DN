import { Schema, model } from 'mongoose'

const lotteryResultSchema = new Schema(
  {
    lottery: {
      type: Schema.Types.ObjectId,
      ref: 'Lottery',
      required: true,
    },

    openSession: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    results: [
      [
        {
          type: String,
          required: true,
          trim: true,
        },
      ],
    ],
  },
  { timestamps: true }
)

export default model('LotteryResult', lotteryResultSchema)
