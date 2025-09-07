"use client"

import { useState, useMemo, useEffect } from "react"
import { Filter, Grid, List, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface Product {
  _id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  subCategory: string
  brand?: string
  sizes?: string[]
  colors?: string[]
}

interface CategoryPageProps {
  params: { categoria: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { categoria } = params

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // 🔹 Buscar produtos do backend
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      if (res.ok) {
        const data = await res.json()
        setAllProducts(data)
      }
    }
    fetchProducts()
  }, [])

  // 🔹 Filtragem
  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => product.category.toLowerCase() === categoria.toLowerCase())

    // Busca
    if (searchTerm) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Faixa de preço
    products = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Marca
    if (selectedBrands.length > 0) {
      products = products.filter((product) => selectedBrands.includes(product.brand || ""))
    }

    // Tamanho
    if (selectedSizes.length > 0) {
      products = products.filter((product) => product.sizes?.some((s) => selectedSizes.includes(s)))
    }

    // Cor
    if (selectedColors.length > 0) {
      products = products.filter((product) => product.colors?.some((c) => selectedColors.includes(c)))
    }

    // Ordenação
    switch (sortBy) {
      case "price-low":
        return products.sort((a, b) => a.price - b.price)
      case "price-high":
        return products.sort((a, b) => b.price - a.price)
      case "name":
        return products.sort((a, b) => a.name.localeCompare(b.name))
      default:
        return products
    }
  }, [allProducts, categoria, searchTerm, sortBy, priceRange, selectedBrands, selectedSizes, selectedColors])

  // 🔹 Valores únicos para filtros
  const brands = [...new Set(allProducts.filter((p) => p.category.toLowerCase() === categoria.toLowerCase()).map((p) => p.brand).filter(Boolean))]
  const sizes = [...new Set(allProducts.filter((p) => p.category.toLowerCase() === categoria.toLowerCase()).flatMap((p) => p.sizes || []))]
  const colors = [...new Set(allProducts.filter((p) => p.category.toLowerCase() === categoria.toLowerCase()).flatMap((p) => p.colors || []))]

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 500])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSortBy("relevance")
  }

  const getCategoryTitle = (cat: string) => {
    const titles: { [key: string]: string } = {
      masculino: "Masculino",
      feminino: "Feminino",
      unissex: "Unissex",
      novidades: "Novidades",
      camisetas: "Camisetas",
      calcas: "Calças",
      jaquetas: "Jaquetas",
      acessorios: "Acessórios",
    }
    return titles[cat] || cat
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getCategoryTitle(categoria)}</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? "s" : ""} encontrado
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Grid e filtros */}
        <div className="flex gap-8">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-lg border">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5" />
                <h2 className="font-semibold">Filtros</h2>
              </div>

              {/* Busca */}
              <div className="space-y-2 mb-4">
                <Label>Buscar</Label>
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar produtos..." />
              </div>

              {/* Preço */}
              <div className="space-y-2 mb-4">
                <Label>
                  Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                </Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} />
              </div>

              {/* Marcas */}
              <div className="space-y-2 mb-4">
                <Label>Marcas</Label>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand!)}
                      onCheckedChange={(checked) =>
                        setSelectedBrands(checked ? [...selectedBrands, brand!] : selectedBrands.filter((b) => b !== brand))
                      }
                    />
                    <Label htmlFor={`brand-${brand}`}>{brand}</Label>
                  </div>
                ))}
              </div>

              {/* Tamanhos */}
              <div className="space-y-2 mb-4">
                <Label>Tamanhos</Label>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox
                        id={`size-${size}`}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) =>
                          setSelectedSizes(checked ? [...selectedSizes, size] : selectedSizes.filter((s) => s !== size))
                        }
                      />
                      <Label htmlFor={`size-${size}`}>{size}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cores */}
              <div className="space-y-2 mb-4">
                <Label>Cores</Label>
                {colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={selectedColors.includes(color)}
                      onCheckedChange={(checked) =>
                        setSelectedColors(checked ? [...selectedColors, color] : selectedColors.filter((c) => c !== color))
                      }
                    />
                    <Label htmlFor={`color-${color}`}>{color}</Label>
                  </div>
                ))}
              </div>

              <Button onClick={clearFilters} variant="outline" className="w-full">Limpar Filtros</Button>
            </div>
          </aside>

          {/* Produtos */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className={viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum produto encontrado.</p>
                <Button onClick={clearFilters}>Limpar Filtros</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
