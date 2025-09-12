"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useSession } from "next-auth/react"

export interface CartItem {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
  stockCount?: number
  size?: string
  color?: string
  originalPrice?: number
  sizes?: string[]
  colors?: { name: string; value: string }[]
}

interface CartContextProps {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void
  removeFromCart: (_id: string, size?: string, color?: string) => void
  updateQuantity: (_id: string, newQuantity: number, size?: string, color?: string) => void
  updateAttributes: (_id: string, attrs: Partial<Pick<CartItem, "size" | "color">>) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextProps | undefined>(undefined)

// util para evitar NaN
const num = (v: unknown, fallback = 0) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : fallback
}

const normalize = (v: string | undefined | null) => (v ?? "").toLowerCase()

export function CartProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession()
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // carregar carrinho quando login mudar
  useEffect(() => {
    if (status === "loading") return // ainda carregando
    if (!session?.user?.email) {
      setCartItems([]) // sem login -> carrinho vazio
      return
    }

    const key = `cartItems_${session.user.email}`
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        setCartItems(JSON.parse(stored) as CartItem[])
      } catch {
        console.error("Erro ao ler carrinho do localStorage")
        setCartItems([])
      }
    } else {
      setCartItems([])
    }
  }, [session, status])

  // salvar carrinho sempre que mudar
  useEffect(() => {
    if (session?.user?.email) {
      const key = `cartItems_${session.user.email}`
      localStorage.setItem(key, JSON.stringify(cartItems))
    }
  }, [cartItems, session])

  const addToCart: CartContextProps["addToCart"] = (product) => {
    setCartItems(prev => {
      const safeStock = Math.max(0, num(product.stockCount, 0))
      const addQty = Math.max(1, num(product.quantity ?? 1, 1))

      const idx = prev.findIndex(
        i =>
          String(i._id) === String(product._id) &&
          normalize(i.size) === normalize(product.size) &&
          normalize(i.color) === normalize(product.color)
      )

      if (idx >= 0) {
        const current = prev[idx]
        const limit = Number.isFinite(current.stockCount ?? 0)
          ? num(current.stockCount, 0)
          : Number.POSITIVE_INFINITY
        const nextQty = Math.min(num(current.quantity, 1) + addQty, limit)

        const copy = prev.slice()
        copy[idx] = { ...current, quantity: nextQty }
        return copy
      }

      return [
        ...prev,
        {
          _id: product._id,
          name: product.name,
          image: product.image,
          price: num(product.price, 0),
          originalPrice: product.originalPrice != null ? num(product.originalPrice, 0) : undefined,
          stockCount: safeStock,
          size: product.size,
          color: product.color,
          sizes: product.sizes,
          colors: product.colors,
          quantity: safeStock > 0 ? Math.min(addQty, safeStock) : 0,
        },
      ]
    })
  }

  const removeFromCart: CartContextProps["removeFromCart"] = (_id, size, color) => {
    setCartItems(prev =>
      prev.filter(
        i =>
          !(
            String(i._id) === String(_id) &&
            normalize(i.size) === normalize(size) &&
            normalize(i.color) === normalize(color)
          )
      )
    )
  }

  const updateQuantity: CartContextProps["updateQuantity"] = (_id, newQuantity, size, color) => {
    setCartItems(prev =>
      prev.map(i => {
        if (
          String(i._id) !== String(_id) ||
          normalize(i.size) !== normalize(size) ||
          normalize(i.color) !== normalize(color)
        ) {
          return i
        }

        const limit =
          Number.isFinite(i.stockCount ?? 0) && (i.stockCount ?? 0) >= 0
            ? num(i.stockCount, 0)
            : Number.POSITIVE_INFINITY
        const next = Math.max(1, Math.min(num(newQuantity, 1), limit))
        return { ...i, quantity: next }
      })
    )
  }

  const updateAttributes: CartContextProps["updateAttributes"] = (_id, attrs) => {
    setCartItems(prev =>
      prev.map(i =>
        String(i._id) === String(_id) ? { ...i, ...attrs } : i
      )
    )
  }

  const clearCart = () => setCartItems([])

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, updateAttributes, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
