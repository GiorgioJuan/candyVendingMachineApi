import mongoose from 'mongoose'
import { config } from '../config/config'

// connect to mongo
mongoose.connect(`mongodb://${config.MONGO_HOSTNAME}:${config.MONGO_PORT}/${config.MONGO_DATABASE}`)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })
