
export interface CandyEntry {
  name: string
  price: number
  cost: number
  stock: number
}

export interface SaleEntry {
  date: string
  quantity: number
  price: number
  product: string
}

export interface UserEntry {
  name: string
  mail: string
  password: string
  is_Admin: boolean
}

export type UserDTO = Pick<UserEntry, 'mail' | 'password'>
