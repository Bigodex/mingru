"use client"

import { useState, useMemo, useEffect } from "react"
import { Filter, X } from "lucide-react"
import { Header } from "@/components/header/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

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

const normalizeProducts = (data: any[]): Product[] =>
  data.map((p) => ({
    ...p,
    brand:
      typeof p.brand === "object" && p.brand !== null
        ? p.brand.name ?? p.brand.value
        : p.brand,
    sizes: (p.sizes || []).map((s: any) =>
      typeof s === "object" ? s.name ?? s.value : s,
    ),
    colors: (p.colors || []).map((c: any) =>
      typeof c === "object" ? c.name ?? c.value : c,
    ),
  }))

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
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products")
      if (res.ok) {
        const data: any[] = await res.json()
        setAllProducts(normalizeProducts(data))
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter(
      (product) => product.category.toLowerCase() === categoria.toLowerCase(),
    )

    if (searchTerm) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    products = products.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1],
    )

    if (selectedBrands.length > 0) {
      products = products.filter((product) =>
        selectedBrands.includes(product.brand || ""),
      )
    }

    if (selectedSizes.length > 0) {
      products = products.filter((product) =>
        product.sizes?.some((s) => selectedSizes.includes(s)),
      )
    }

    if (selectedColors.length > 0) {
      products = products.filter((product) =>
        product.colors?.some((c) => selectedColors.includes(c)),
      )
    }

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
  }, [
    allProducts,
    categoria,
    searchTerm,
    sortBy,
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
  ])

  const categoryProducts = allProducts.filter(
    (p) => p.category.toLowerCase() === categoria.toLowerCase(),
  )
  const brands = [...new Set(categoryProducts.map((p) => p.brand).filter(Boolean))]
  const sizes = [...new Set(categoryProducts.flatMap((p) => p.sizes || []))]
  const colors = [...new Set(categoryProducts.flatMap((p) => p.colors || []))]

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
      <Header
        onCategoryClick={() => console.log("Category clicked")}
        onAvatarClick={() => console.log("Avatar clicked")}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              {getCategoryTitle(categoria)}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {filteredProducts.length} produto
              {filteredProducts.length !== 1 ? "s" : ""} encontrado
            </p>
          </div>

          {/* Botão de filtros em mobile */}
          <Button
            variant="outline"
            className="lg:hidden flex items-center gap-2"
            onClick={() => setShowFilters(true)}
          >
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FiltersPanel
              {...{
                searchTerm,
                setSearchTerm,
                priceRange,
                setPriceRange,
                brands,
                selectedBrands,
                setSelectedBrands,
                sizes,
                selectedSizes,
                setSelectedSizes,
                colors,
                selectedColors,
                setSelectedColors,
                clearFilters,
              }}
            />
          </aside>

          {/* Produtos */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  Nenhum produto encontrado.
                </p>
                <Button onClick={clearFilters}>Limpar Filtros</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal Filtros Mobile */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-4/5 max-w-xs bg-card p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">Filtros</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <FiltersPanel
              {...{
                searchTerm,
                setSearchTerm,
                priceRange,
                setPriceRange,
                brands,
                selectedBrands,
                setSelectedBrands,
                sizes,
                selectedSizes,
                setSelectedSizes,
                colors,
                selectedColors,
                setSelectedColors,
                clearFilters,
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// 🔹 Componente isolado para filtros
function FiltersPanel({
  searchTerm,
  setSearchTerm,
  priceRange,
  setPriceRange,
  brands,
  selectedBrands,
  setSelectedBrands,
  sizes,
  selectedSizes,
  setSelectedSizes,
  colors,
  selectedColors,
  setSelectedColors,
  clearFilters,
}: any) {
  return (
    <div className="sticky top-24 bg-card p-6 rounded-lg border space-y-6">
      {/* Busca */}
      <div className="space-y-2">
        <Label>Buscar</Label>
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar produtos..."
        />
      </div>

      {/* Preço */}
      <div className="space-y-2">
        <Label>
          Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
        </Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={1000}
          step={10}
        />
      </div>

      {/* Marcas */}
      <div className="space-y-2">
        <Label>Marcas</Label>
        {brands.map((brand: string) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${brand}`}
              checked={selectedBrands.includes(String(brand))}
              onCheckedChange={(checked) =>
                setSelectedBrands(
                  checked
                    ? [...selectedBrands, String(brand)]
                    : selectedBrands.filter((b: string) => b !== brand),
                )
              }
            />
            <Label htmlFor={`brand-${brand}`}>{String(brand)}</Label>
          </div>
        ))}
      </div>

      {/* Tamanhos */}
      <div className="space-y-2">
        <Label>Tamanhos</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size: string) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(String(size))}
                onCheckedChange={(checked) =>
                  setSelectedSizes(
                    checked
                      ? [...selectedSizes, String(size)]
                      : selectedSizes.filter((s: string) => s !== size),
                  )
                }
              />
              <Label htmlFor={`size-${size}`}>{String(size)}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Cores */}
      <div className="space-y-2">
        <Label>Cores</Label>
        {colors.map((color: string) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={`color-${color}`}
              checked={selectedColors.includes(String(color))}
              onCheckedChange={(checked) =>
                setSelectedColors(
                  checked
                    ? [...selectedColors, String(color)]
                    : selectedColors.filter((c: string) => c !== color),
                )
              }
            />
            <Label htmlFor={`color-${color}`}>{String(color)}</Label>
          </div>
        ))}
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Limpar Filtros
      </Button>
    </div>
  )
}
