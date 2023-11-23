import mongoose, { Document } from 'mongoose'
import { SaleEntry } from '../types'

const { model, Schema } = mongoose

export interface SaleModel extends Document, SaleEntry {}

const saleSchema = new Schema({
  date: Date,
  quantity: Number,
  price: Number,
  product: String
})

const Sale = model<SaleModel>('Sale', saleSchema)

export default Sale
