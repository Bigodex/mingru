"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { Product } from "@/components/types"

interface CartItem extends Product {
  stockCount?: number // estoque disponível
  size?: string
  color?: string
  originalPrice?: number // opcional (promo)
  quantity: number // quantidade no carrinho
}

interface CartContextProps {
  cartItems: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (id: string | number, size?: string, color?: string) => void
  updateQuantity: (id: string | number, newQuantity: number, size?: string, color?: string) => void
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
      const safeStock = Math.max(0, num(product.stockCount, 0))

      const exists = prev.find(
        (i) => String(i.id) === String(product.id) && i.size === product.size && i.color === product.color,
      )

      if (exists) {
        const limit = num(exists.stockCount, safeStock) || Number.POSITIVE_INFINITY
        return prev.map((i) =>
          String(i.id) === String(product.id) && i.size === product.size && i.color === product.color
            ? { ...i, quantity: Math.min(num(i.quantity, 1) + 1, limit) }
            : i,
        )
      }

      return [
        ...prev,
        {
          ...product,
          stockCount: safeStock,
          quantity: safeStock > 0 ? 1 : 0, // só adiciona se tiver estoque
          price: num(product.price, 0),
          originalPrice: product.originalPrice != null ? num(product.originalPrice, 0) : undefined,
        },
      ]
    })
  }

  // Remove item (pela combinação id + size + color)
  const removeFromCart = (id: string | number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.filter((i) => !(String(i.id) === String(id) && i.size === size && i.color === color)),
    )
  }

  // Atualiza quantidade (pela combinação id + size + color)
  const updateQuantity = (id: string | number, newQuantity: number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (String(i.id) !== String(id) || i.size !== size || i.color !== color) return i
        const limit =
          Number.isFinite(i.stockCount) && (i.stockCount ?? 0) >= 0
            ? num(i.stockCount, 0)
            : Number.POSITIVE_INFINITY
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
