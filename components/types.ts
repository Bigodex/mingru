export interface Product {
  id: string | number
  _id?: string            // se vier do Mongo
  name: string
  description: string
  price: number
  originalPrice?: number
  image?: string          // capa do produto
  images?: string[]       // galeria
  category?: string
  subCategory?: string
  brand?: string
  sizes?: string[]
  colors?: { name: string; value: string }[]
  inStock?: boolean
  stockCount?: number
  rating?: number
  reviewCount?: number
  features?: string[]
  specifications?: Record<string, string>
}