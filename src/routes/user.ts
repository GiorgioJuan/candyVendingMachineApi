import express from 'express'
import User from '../models/User'
import { UserDTO } from '../types'

const router = express.Router()

router.post('/login', (req: { body: UserDTO }, res) => {
  User.findOne({ mail: req.body.mail }).then(result => {
    if (result == null) {
      return res.status(404).json({ message: 'User not found' })
    }
    if (result.password === req.body.password) {
      return res.status(200).send(result)
    } else {
      return res.status(405).json({ message: 'wrong credentials' })
    }
  }).catch(err => {
    return res.status(500).send(err.message)
  })
})

export default router
