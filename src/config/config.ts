import dotenv from 'dotenv'

dotenv.config()

const MQTT_HOSTNAME = process.env.MQTT_HOSTNAME
const MQTT_PORT = process.env.MQTT_PORT

const MONGO_HOSTNAME = process.env.MONGODB_HOSTNAME
const MONGO_PORT = process.env.MONGODB_PORT
const MONGO_DATABASE = process.env.MONGODB_DATABASE

export const config = {
  MONGO_HOSTNAME,
  MONGO_PORT,
  MONGO_DATABASE,
  MQTT_HOSTNAME,
  MQTT_PORT
}
