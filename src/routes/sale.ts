import express from 'express'
import mqtt from '../utils/mqtt'
import Candy from '../models/Candy'
import Sale from '../models/Sale'
import nodemailer from 'nodemailer'

const router = express.Router()

router.get('/sales', (_req, res) => {
  Sale.find({}).then(result => {
    if (result != null) {
      res.status(200).send(result)
    } else {
      res.status(404).json({ message: 'Sales not found' })
    }
  }).catch(err => {
    res.status(404).send(err.message)
  })
})

mqtt.on('connect', () => {
  mqtt.subscribe('AustralFI/inel13/+/sold')
})

mqtt.on('message', async (topic: string, message: Buffer) => {
  if (topic.includes('sold')) {
    const result = await Candy.findOne({ name: 'Sugus' })
    if (result != null) {
      const newStock = result.stock - +message.toString()
      await Candy.findOneAndUpdate({ name: 'Sugus' }, { stock: newStock }, { new: true })

      const sale = new Sale({
        date: new Date(),
        quantity: +message,
        price: result.price,
        product: result.name
      })

      try {
        await sale.save()
        console.log('Sale saved successfully.')
      } catch (error) {
        console.error('Error saving sale:', error)
      }

      if (newStock <= 6) {
        const config = {
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        }
        const transporter = nodemailer.createTransport(config)

        const mailContent = {
          from: process.env.EMAIL,
          to: 'maintenance@gmail.com',
          subject: 'Stock bajo',
          text: 'El stock de caramelos es bajo'
        }

        transporter.sendMail(mailContent, (err, info) => {
          if (err) {
            console.log('Failed to send email', err)
          } else {
            console.log('Mail sent successfully', info)
          }
        })
      }
    }
  }
})

export default router
