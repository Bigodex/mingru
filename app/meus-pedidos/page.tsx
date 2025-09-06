"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock orders data
const mockOrders = [
  {
    id: "SS-2024-001234",
    date: "2024-01-15",
    status: "delivered",
    total: 249.8,
    items: [
      {
        id: 1,
        name: "Camiseta Oversized Preta",
        image: "/black-oversized-streetwear-t-shirt.jpg",
        size: "M",
        color: "Preto",
        quantity: 2,
        price: 89.9,
      },
      {
        id: 2,
        name: "Hoodie Urban Style",
        image: "/urban-style-hoodie-streetwear.jpg",
        size: "G",
        color: "Cinza",
        quantity: 1,
        price: 159.9,
      },
    ],
    tracking: "BR123456789SS",
  },
  {
    id: "SS-2024-001235",
    date: "2024-01-20",
    status: "shipped",
    total: 199.9,
    items: [
      {
        id: 3,
        name: "Calça Cargo Bege",
        image: "/beige-cargo-pants-streetwear.jpg",
        size: "42",
        color: "Bege",
        quantity: 1,
        price: 199.9,
      },
    ],
    tracking: "BR987654321SS",
  },
  {
    id: "SS-2024-001236",
    date: "2024-01-25",
    status: "processing",
    total: 329.9,
    items: [
      {
        id: 4,
        name: "Jaqueta Bomber Verde",
        image: "/green-bomber-jacket-streetwear.jpg",
        size: "G",
        color: "Verde",
        quantity: 1,
        price: 249.9,
      },
    ],
    tracking: null,
  },
]

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

export default function MyOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const getOrdersByStatus = (status: string) => {
    return mockOrders.filter((order) => order.status === status)
  }

  const OrderCard = ({ order }: { order: (typeof mockOrders)[0] }) => {
    const statusInfo = statusConfig[order.status as keyof typeof statusConfig]
    const StatusIcon = statusInfo.icon

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">Pedido #{order.id}</h3>
              <p className="text-sm text-muted-foreground">
                Realizado em {new Date(order.date).toLocaleDateString("pt-BR")}
              </p>
            </div>
            <Badge className={statusInfo.color}>
              <StatusIcon className="h-3 w-3 mr-1" />
              {statusInfo.label}
            </Badge>
          </div>

          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.size} • {item.color} • Qtd: {item.quantity}
                  </p>
                  <p className="text-sm font-medium">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div>
              <span className="text-sm text-muted-foreground">Total: </span>
              <span className="font-semibold text-lg">R$ {order.total.toFixed(2).replace(".", ",")}</span>
            </div>
            <div className="flex gap-2">
              {order.tracking && (
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  Rastrear
                </Button>
              )}
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
            </div>
          </div>

          {order.tracking && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">Código de rastreamento:</p>
              <p className="font-mono text-sm">{order.tracking}</p>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Meus Pedidos</h1>
          <p className="text-muted-foreground">Acompanhe o status dos seus pedidos</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Todos ({mockOrders.length})</TabsTrigger>
            <TabsTrigger value="processing">Processando ({getOrdersByStatus("processing").length})</TabsTrigger>
            <TabsTrigger value="shipped">Enviados ({getOrdersByStatus("shipped").length})</TabsTrigger>
            <TabsTrigger value="delivered">Entregues ({getOrdersByStatus("delivered").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {mockOrders.length > 0 ? (
                mockOrders.map((order) => <OrderCard key={order.id} order={order} />)
              ) : (
                <div className="text-center py-12">
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
            <div className="space-y-4">
              {getOrdersByStatus("processing").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipped" className="mt-6">
            <div className="space-y-4">
              {getOrdersByStatus("shipped").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-6">
            <div className="space-y-4">
              {getOrdersByStatus("delivered").map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
