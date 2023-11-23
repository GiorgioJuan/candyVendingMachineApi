// mostrar datos sobre caramelo
// poder editar caramelo
// 18 canicas
// cuando quedan 6 canicas, se muestra un mensaje de que quedan pocas canicas y le avisa al mantenimiento

import express from 'express'
import mqtt from '../utils/mqtt'
import Candy from '../models/Candy'
import { CandyEntry } from '../types'
const router = express.Router()

router.get('/candy', (_req, res) => {
  Candy.findOne({ name: 'Sugus' }).then(result => {
    if (result != null) {
      res.status(200).send(result)
    } else {
      res.status(404).json({ message: 'Candy not found' })
    }
  }).catch(err => {
    res.status(404).send(err.message)
  })
})

router.post('/candy', (req: { body: CandyEntry }, res) => {
  Candy.findOneAndUpdate({ name: 'Sugus' }, { price: req.body.price, cost: req.body.cost, stock: req.body.stock }, { new: true }).then(result => {
    if (result != null) {
      if (+result.price > 0) {
        mqtt.publish('AustralFI/inel13/69/new_price', req.body.price.toString(), (err: any) => {
          if (err) {
            console.error('Error publishing message:', err)
          } else {
            console.log('Message published successfully:')
          }
        })
      }
      res.status(200).send(result)
    } else {
      res.status(404).json({ message: 'Candy not found' })
    }
  }).catch(err => {
    res.status(404).send(err.message)
  })
})

// mqtt
mqtt.on('connect', () => {
  mqtt.subscribe('AustralFI/inel13/+/init_values')
})

mqtt.on('message', async (topic: string, message: Buffer) => {
  if (topic.includes('init_values')) {
    let msg
    try {
      const result = await Candy.findOne({ name: 'Sugus' })
      if (result != null) {
        msg = `${result.stock} ${result.price}`
      } else {
        throw new Error('Candy not found')
      }
    } catch (err) {
      // @ts-expect-error
      return res.status(404).send(err.message)
    }

    mqtt.publish('AustralFI/inel13/69/actual_values', msg, (err: any) => {
      if (err) {
        console.error('Error publishing message:', err)
      } else {
        console.log('Message published successfully:')
      }
    })
  }
})
export default router
