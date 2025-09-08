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

export interface CartItem extends Product {
  name?: string
  description?: string
  stockCount?: number    // estoque disponível (override same name)
  size?: string          // opcional: selecionado
  color?: string         // opcional: selecionado
  originalPrice?: number // opcional (promo)
  quantity: number       // quantidade no carrinho
}