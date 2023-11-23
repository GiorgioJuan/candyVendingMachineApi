import mongoose, { Document } from 'mongoose'
import { CandyEntry } from '../types'

const { model, Schema } = mongoose

export interface CandyModel extends Document, CandyEntry {}

const candySchema = new Schema({
  name: String,
  price: Number,
  cost: Number,
  stock: Number
})

const Candy = model<CandyModel>('Candy', candySchema)

export default Candy
