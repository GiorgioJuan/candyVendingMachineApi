import mongoose, { Document } from 'mongoose'
import { UserEntry } from '../types'

const { model, Schema } = mongoose

export interface UserModel extends Document, UserEntry {}

const userSchema = new Schema({
  name: String,
  mail: String,
  password: String,
  is_Admin: Boolean
})

const User = model<UserModel>('User', userSchema)

export default User
