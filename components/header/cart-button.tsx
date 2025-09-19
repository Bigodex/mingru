"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function CartButton({ session, router, mounted }: any) {
  const { cartItems = [] } = useCart();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative group mr-4 ">
      <Button
        variant="default"
        size="icon"
        className="bg-white/80 text-accent-foreground hover:bg-white hover:shadow-xl transition-colors"
        onClick={() => {
          if (session) router.push("/carrinho");
          else router.push("/login");
        }}
      >
        <ShoppingCart className="h-8 w-8" />
      </Button>

      {mounted && totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-white/80 text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-black group-hover:bg-primary-foreground group-hover:text-white">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}
