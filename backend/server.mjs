import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './app.mjs'
import { Lottery } from './src/models/index.mjs'

dotenv.config({ path: './config.env' })
const { DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD, PORT } = process.env

const database = DATABASE_URL
  // Fill username and password
  .replace('<USERNAME>', DATABASE_USERNAME)
  .replace('<PASSWORD>', DATABASE_PASSWORD)

// Connect to database
mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => Lottery.findOne({}))
  .then((lottery) => {
    if (!lottery) {
      return Lottery.create({
        name: 'Miền Bắc',
        code: 'miba',
        ticketPrice: 10_000,
        prizes: [
          500_000_000, // Khớp 5 số giải đặc biệt
          10_000_000, // Khớp 5 số giải nhất
          5_000_000, // Khớp 5 số giải nhì
          1_000_000, // Khớp 5 số giải ba
          400_000, // Khớp 5 số giải tư
          200_000, // Khớp 5 số giải năm
          100_000, // Khớp 5 số giải sáu
          40_000, // Khớp 5 số giải bảy
          40_000, // Khớp 2 số cuối giải đặc biệt
        ],
      })
    }
  })

// Start server
app.listen(PORT)

// process.on('uncaughtException', () => {
//   process.exit(1)
// })

// process.on('unhandledRejection', () => {
//   process.exit(1)
// })
