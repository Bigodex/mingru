"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart-context"

export function CartIcon() {
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  return (
    <Button variant="ghost" size="icon" asChild className="relative">
      <Link href="/carrinho">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
            {totalItems > 99 ? "99+" : totalItems}
          </Badge>
        )}
      </Link>
    </Button>
  )
}
