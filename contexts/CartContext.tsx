"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Product {
  id: number
  name: string
  description: string
  price: number // mantenha number no banco/JSON (use ponto, ex: 179.90)
  image: string
}

interface CartItem extends Product {
  stock: number // estoque da variação escolhida
  size?: string
  color?: string
  originalPrice?: number // opcional (promo)
  quantity: number // quantidade no carrinho
}

interface CartContextProps {
  cartItems: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: number, size?: string, color?: string) => void
  updateQuantity: (id: number, newQuantity: number, size?: string, color?: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

// util para evitar NaN
const num = (v: unknown, fallback = 0) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Adiciona item (incrementa até o limite do estoque)
  const addToCart = (product: CartItem) => {
    setCartItems((prev) => {
      const safeStock = Math.max(0, num(product.stock, 0))

      const exists = prev.find((i) => i.id === product.id && i.size === product.size && i.color === product.color)

      if (exists) {
        const limit = num(exists.stock, safeStock) || Number.POSITIVE_INFINITY
        return prev.map((i) =>
          i.id === product.id && i.size === product.size && i.color === product.color
            ? { ...i, quantity: Math.min(num(i.quantity, 1) + 1, limit) }
            : i,
        )
      }

      return [
        ...prev,
        {
          ...product,
          stock: safeStock,
          // começa com 1, mas respeitando estoque (se quiser começar com 0, troque aqui)
          quantity: Math.min(1, safeStock || 1),
          price: num(product.price, 0), // garante number
          originalPrice: product.originalPrice != null ? num(product.originalPrice, 0) : undefined,
        },
      ]
    })
  }

  // Remove item (pela combinação id + size + color)
  const removeFromCart = (id: number, size?: string, color?: string) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)))
  }

  // Atualiza quantidade (pela combinação id + size + color)
  const updateQuantity = (id: number, newQuantity: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.id !== id || i.size !== size || i.color !== color) return i
        const limit = Number.isFinite(i.stock) && i.stock >= 0 ? num(i.stock, 0) : Number.POSITIVE_INFINITY
        const next = Math.max(1, Math.min(num(newQuantity, 1), limit))
        return { ...i, quantity: next }
      }),
    )
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
