"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, Eye, List } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Configurações de status
const statusConfig = {
  processing: {
    label: "Processando",
    color: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  shipped: {
    label: "Enviado",
    color: "bg-blue-100 text-blue-800",
    icon: Truck,
  },
  delivered: {
    label: "Entregue",
    color: "bg-green-100 text-green-800",
    icon: CheckCircle,
  },
}

type Order = {
  _id: string
  createdAt: string
  status: keyof typeof statusConfig
  total: number
  trackingCode?: string
  items: {
    _id: string
    name: string
    image: string
    size?: string
    color?: string
    quantity: number
    price: number
  }[]
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders") // endpoint que devolve os pedidos do usuário logado
        if (!res.ok) throw new Error("Erro ao buscar pedidos")
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [])

  const getOrdersByStatus = (status: Order["status"]) => {
    return orders.filter((order) => order.status === status)
  }

  const OrderCard = ({ order }: { order: Order }) => {
    const statusInfo = statusConfig[order.status]
    const StatusIcon = statusInfo.icon

    return (
      <Card className="hover:shadow-lg border border-border/60 rounded-xl transition-all">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Pedido #{order._id}</h3>
              <p className="text-sm text-muted-foreground">
                Realizado em {new Date(order.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <Badge className={`${statusInfo.color} px-3 py-1 rounded-full text-xs font-medium`}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>

          {/* Itens */}
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item._id} className="flex gap-3 bg-muted/40 p-2 rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg border"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.size && <>{item.size} • </>}
                    {item.color && <>{item.color} • </>}
                    Qtd: {item.quantity}
                  </p>
                  <p className="text-sm font-semibold">
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div>
              <span className="text-sm text-muted-foreground">Total: </span>
              <span className="font-semibold text-lg">
                R$ {order.total.toFixed(2).replace(".", ",")}
              </span>
            </div>
            <div className="flex gap-2">
              {order.trackingCode && (
                <Button variant="outline" size="sm" className="rounded-lg">
                  <Package className="h-4 w-4 mr-2" />
                  Rastrear
                </Button>
              )}
              <Button variant="outline" size="sm" className="rounded-lg">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </div>

          {/* Tracking */}
          {order.trackingCode && (
            <div className="mt-3 p-3 bg-muted/30 rounded-lg border">
              <p className="text-xs text-muted-foreground">Código de rastreamento:</p>
              <p className="font-mono text-sm">{order.trackingCode}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onCategoryClick={() => console.log("Category clicked")} 
        onAvatarClick={() => console.log("Avatar clicked")} 
      />

      <main className="container mx-auto px-4 py-10 flex-1">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold mb-2">Meus Pedidos</h1>
          <p className="text-muted-foreground">
            Acompanhe o status dos seus pedidos de forma simples e rápida
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20">Carregando...</div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-xl border p-1 bg-muted/40">
              <TabsTrigger value="all">
                <List className="h-4 w-4 mr-2" />
                Todos ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="processing">
                <Clock className="h-4 w-4 mr-2" />
                Processando ({getOrdersByStatus("processing").length})
              </TabsTrigger>
              <TabsTrigger value="shipped">
                <Truck className="h-4 w-4 mr-2" />
                Enviados ({getOrdersByStatus("shipped").length})
              </TabsTrigger>
              <TabsTrigger value="delivered">
                <CheckCircle className="h-4 w-4 mr-2" />
                Entregues ({getOrdersByStatus("delivered").length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                {orders.length > 0 ? (
                  orders.map((order) => <OrderCard key={order._id} order={order} />)
                ) : (
                  <div className="text-center py-20">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
                    <p className="text-muted-foreground mb-4">Você ainda não fez nenhum pedido.</p>
                    <Button asChild>
                      <Link href="/">Começar a Comprar</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="processing" className="mt-6">
              <div className="space-y-6">
                {getOrdersByStatus("processing").map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="shipped" className="mt-6">
              <div className="space-y-6">
                {getOrdersByStatus("shipped").map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivered" className="mt-6">
              <div className="space-y-6">
                {getOrdersByStatus("delivered").map((order) => (
                  <OrderCard key={order._id} order={order} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </main>

      <Footer />
    </div>
  )
}
