import { config } from '../config/config'
import * as fs from 'fs'

const mqtt = require('mqtt')

const ca = fs.readFileSync('./src/certs/ca.crt')

const options = {
  port: config.MQTT_PORT,
  host: config.MQTT_HOSTNAME,
  protocol: 'mqtts',
  ca: ca, // Certificado de la Autoridad de Certificación
  rejectUnauthorized: false // Opción para aceptar certificados autofirmados (¡Usar solo en desarrollo!)
}

const client = mqtt.connect(options)

client.on('connect', () => {
  client.subscribe('+', (err: null) => {
    if (err == null) {
      console.log('Client connected')
    } else {
      console.error('Error connecting client:', err)
    }
  })
})

client.on('message', (topic: any, message: { toString: () => any }) => {
  // message is Buffer
  console.log(message.toString())
})
export default client
