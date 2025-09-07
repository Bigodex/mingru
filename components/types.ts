// src/types/product.ts
export interface Product {
  id: string | number
  name: string
  description: string
  price: number
  image: string
  category?: string
  subCategory?: string
  brand?: string
  sizes?: string[]
  colors?: string[]
}
