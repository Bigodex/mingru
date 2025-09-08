"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { CartItem } from "@/contexts/CartContext";

export default function CartList({ cartItems }: { cartItems: CartItem[] }) {
  const { updateQuantity, removeFromCart, updateAttributes } = useCart();

  return (
    <div className="lg:col-span-2 space-y-4">
      {cartItems.map((item) => {
        const usedQuantity = cartItems
          .filter(
            (i) =>
              String(i._id) === String(item._id) &&
              (i.size ?? "") === (item.size ?? "") &&
              (i.color ?? "") === (item.color ?? "")
          )
          .reduce((sum, i) => sum + i.quantity, 0);

        const availableStock = Math.max(0, (item.stockCount ?? 0) - usedQuantity);

        return (
          <Card key={`${item._id}-${item.size ?? ""}-${item.color ?? ""}`}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Image */}
                <Link href={`/produto/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 object-cover rounded-lg"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    {/* Convertido para coluna p/ título + atributos */}
                    <div className="flex flex-col items-start gap-y-2">
                      <Link href={`/produto/${item._id}`}>
                        <h3 className="font-semibold hover:text-primary ml-2">
                          {item.name}
                        </h3>
                      </Link>
                      {/* Tamanho e Cor abaixo do título */}
                      <div className="flex items-center gap-x-4 ml-2">
                        {item.size ? (
                          <span className="text-sm text-muted-foreground ml-2">
                            Tamanho: {item.size}
                          </span>
                        ) : item.sizes && item.sizes.length > 0 ? (
                          <select
                            className="border rounded-md p-1 text-sm hover:bg-primary hover:text-primary-foreground"
                            onChange={(e) =>
                              updateAttributes(item._id, { size: e.target.value })
                            }
                            defaultValue=""
                            aria-label="Selecionar tamanho"
                          >
                            <option value="">Selecione o tamanho</option>
                            {item.sizes.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        ) : null}
                        {item.color ? (
                          <span className="text-sm text-muted-foreground">
                            Cor: {item.color}
                          </span>
                        ) : item.colors && item.colors.length > 0 ? (
                          <select
                            className="border rounded-md p-1 text-sm hover:bg-primary hover:text-primary-foreground"
                            onChange={(e) =>
                              updateAttributes(item._id, { color: e.target.value })
                            }
                            defaultValue=""
                            aria-label="Selecionar cor"
                          >
                            <option value="">Selecione a cor</option>
                            {item.colors.map((c) => (
                              <option key={c.value} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    </div>
                    {/* Quantidade fixa entre cor e preço */}
                    <div className="flex-shrink-0 mx-4">
                      <div className="flex items-center border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item._id, item.quantity - 1, item.size, item.color);
                            }
                          }}
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="px-3">{item.quantity}</span>

                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={availableStock <= 0}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1, item.size, item.color)
                          }
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {/* Ações e preço */}
                    <div className="flex flex-col items-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          removeFromCart(item._id, item.size, item.color)
                        }
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {/* Agora só exibe preço */}
                      <div className="mt-2">
                        <span className="font-semibold text-primary text-black w-fit px-2 py-1 rounded-sm">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stock availability */}
                  <div className="flex flex-col mt-2">
                    {availableStock > 0 ? (
                      <Badge variant="outline">{availableStock} em estoque</Badge>
                    ) : (
                      <Badge variant="destructive">Fora de estoque</Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <Button variant="outline" asChild>
        <Link href="/">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continuar Comprando
        </Link>
      </Button>
    </div>
  );
}
