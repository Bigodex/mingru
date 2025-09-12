"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import type { CartItem } from "@/contexts/CartContext";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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

        // flags para validação
        const needsSize = item.sizes && item.sizes.length > 0 && !item.size;
        const needsColor = item.colors && item.colors.length > 0 && !item.color;

        return (
          <Card
            key={`${item._id}-${item.size ?? ""}-${item.color ?? ""}`}
            className="overflow-hidden"
          >
            <CardContent className="p-0">
              <details className="group">
                {/* HEADER / RESUMO */}
                <summary
                  className="cursor-pointer select-none p-4 sm:p-5
                             [&::-webkit-details-marker]:hidden
                             grid grid-cols-[64px_1fr_auto] sm:grid-cols-[80px_1fr_auto] gap-3 sm:gap-4 items-center"
                >
                  {/* Imagem */}
                  <Link href={`/produto/${item._id}`} className="block">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover aspect-square"
                    />
                  </Link>

                  {/* Título + validações inline */}
                  <div className="min-w-0">
                    <div className="flex items-center space-x-2">
                      <Link href={`/produto/${item._id}`} className="block">
                        <h3 className="font-semibold hover:text-primary text-sm sm:text-base truncate">
                          {item.name}
                        </h3>
                      </Link>
                      {needsSize && (
                        <Badge variant="destructive" className="text-xs ml-20">
                          Escolha o tamanho
                        </Badge>
                      )}
                      {needsColor && (
                        <Badge variant="destructive" className="text-xs">
                          Escolha a cor
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      {item.size && <span>Tam: {item.size}</span>}
                      {item.color && <span>Cor: {item.color}</span>}
                      <span className="hidden md:inline">•</span>
                      <span className="hidden md:inline">Qtd: {item.quantity}</span>
                    </div>
                  </div>

                  {/* Preço + quantidade */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Quantidade inline (desktop/tablet) */}
                    <div className="hidden md:block">
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item._id, item.quantity - 1, item.size, item.color);
                            }
                          }}
                          aria-label="Diminuir quantidade"
                          className="h-8 w-8"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="px-3 min-w-8 text-center select-none text-sm">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={availableStock <= 0}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1, item.size, item.color)
                          }
                          aria-label="Aumentar quantidade"
                          className="h-8 w-8 disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Preço resumido */}
                    <span className="font-semibold text-black bg-white/70 border border-border px-2 py-1 rounded-sm text-sm sm:text-base whitespace-nowrap">
                      R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                    </span>
                    <ChevronDown
                      className="h-4 w-4 transform rotate-180 group-hover:rotate-0 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </summary>

                {/* DETALHES */}
                <div className="p-4 sm:p-6 border-t space-y-4">
                  {/* Atributos (tamanho/cor) */}
                  <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2">
                    {/* Tamanho */}
                    {item.size ? (
                      <span className="text-sm text-primary-foreground">Tamanho: {item.size}</span>
                    ) : item.sizes && item.sizes.length > 0 ? (
                      <Select
                        onValueChange={(value) =>
                          updateAttributes(item._id, { size: value })
                        }
                        defaultValue=""
                      >
                        <SelectTrigger className="w-full sm:w-auto border-gray-200 shadow-md bg-white text-sm text-primary-foreground">
                          <SelectValue placeholder="Selecione o tamanho" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md border-gray-200 shadow-md bg-white">
                          {item.sizes.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="cursor-pointer hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}

                    {/* Cor */}
                    {item.color ? (
                      <span className="text-sm text-muted-foreground">Cor: {item.color}</span>
                    ) : item.colors && item.colors.length > 0 ? (
                      <Select
                        onValueChange={(value) =>
                          updateAttributes(item._id, { color: value })
                        }
                        defaultValue=""
                      >
                        <SelectTrigger className="w-full sm:w-auto border-gray-200 shadow-md bg-white text-sm">
                          <SelectValue placeholder="Selecione a cor" />
                        </SelectTrigger>
                        <SelectContent className="rounded-md border-gray-200 shadow-md bg-white">
                          {item.colors.map((c) => (
                            <SelectItem
                              key={c.value}
                              value={c.name}
                              className="cursor-pointer hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
                            >
                              {c.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : null}
                  </div>

                  {/* Quantidade (mobile) + Estoque + Remover */}
                  <div className="flex flex-col gap-3">
                    {/* Quantidade – só aparece no mobile */}
                    <div className="md:hidden">
                      <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-auto">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (item.quantity > 1) {
                              updateQuantity(item._id, item.quantity - 1, item.size, item.color);
                            }
                          }}
                          aria-label="Diminuir quantidade"
                          className="h-9 w-9"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="px-3 min-w-10 text-center select-none">
                          {item.quantity}
                        </span>

                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={availableStock <= 0}
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1, item.size, item.color)
                          }
                          aria-label="Aumentar quantidade"
                          className="h-9 w-9 disabled:opacity-50"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Estoque */}
                    <div>
                      {availableStock > 0 ? (
                        <Badge variant="outline" className="w-full sm:w-auto justify-center">
                          {availableStock} em estoque
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="w-full sm:w-auto justify-center">
                          Fora de estoque
                        </Badge>
                      )}
                    </div>

                    {/* Remover */}
                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item._id, item.size, item.color)}
                        aria-label="Remover item"
                        className="h-9 w-9"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </details>
            </CardContent>
          </Card>
        );
      })}

      <div className="pt-1">
        <Button
          variant="outline"
          asChild
          className="w-full sm:w-auto hover:bg-primary hover:border-none bg-white text-black shadow-md"
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continuar Comprando
          </Link>
        </Button>
      </div>
    </div>
  );
}
