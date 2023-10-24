/* eslint-disable no-console */
import mongoose from 'mongoose'
import { loadJsonFile } from 'load-json-file'
import {
  Lottery,
  LotteryCheckHistory,
  LotteryResult,
  User,
} from '../src/models/index.mjs'

const database =
  'mongodb+srv://thangndgit:12345679,adgjm@personal-project.7priamb.mongodb.net/funix-lottery'

async function initData() {
  try {
    await mongoose.connect(database, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    // Clear old data
    await User.deleteMany({})
    await Lottery.deleteMany({})
    await LotteryResult.deleteMany({})
    await LotteryCheckHistory.deleteMany({})

    // Read new data
    const users = await loadJsonFile('database/data/funix-lottery.users.json')
    const lotteries = await loadJsonFile(
      'database/data/funix-lottery.lotteries.json'
    )
    const lotteryResults = await loadJsonFile(
      'database/data/funix-lottery.lotteryresults.json'
    )
    const lotteryCheckHistories = await loadJsonFile(
      'database/data/funix-lottery.lotterycheckhistories.json'
    )

    // Insert new data
    await User.insertMany(users)
    await Lottery.insertMany(lotteries)
    await LotteryResult.insertMany(lotteryResults)
    await LotteryCheckHistory.insertMany(lotteryCheckHistories)

    console.log('Import success')

    // Catch error
  } catch (error) {
    console.log('Import failed: ', error.message)

    // Disconnect
  } finally {
    mongoose.disconnect()
  }
}

initData()
