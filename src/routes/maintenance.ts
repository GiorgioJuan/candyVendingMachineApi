// que haga restock de caramelos
import express from 'express'
import Candy from '../models/Candy'
import mqtt from "../utils/mqtt";

const router = express.Router()

router.post('/restock/:quantity', async (req, res) => {
  if (+req.params.quantity <= 0) return res.status(400).json({ message: 'Quantity must be positive' })

  let newStock
  try {
    const result = await Candy.findOne({ name: 'Sugus' })
    if (result != null) {
      newStock = result.stock + +req.params.quantity

      mqtt.publish('AustralFI/inel13/69/refill', req.params.quantity, (err: any) => {
        if (err) {
          console.error('Error publishing message:', err)
        } else {
          console.log('Message published successfully:')
        }
      })
    } else {
      return res.status(404).json({ message: 'Candy not found' })
    }
  } catch (err) {
    // @ts-expect-error
    return res.status(404).send(err.message)
  }

  try {
    await Candy.findOneAndUpdate({ name: 'Sugus' }, { stock: newStock }, { new: true })
  } catch (err) {
    // @ts-expect-error
    return res.status(404).send(err.message)
  }

  return res.status(200).send({ message: 'Candy restocked successfully' })
})

export default router
