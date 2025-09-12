"use client"

import { useState, useMemo, useEffect } from "react"
import { Filter } from "lucide-react"
import { Header } from "@/components/header"
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

// 🔹 Utilitário compartilhado
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

interface SubcategoryPageProps {
  params: { categoria: string; subcategoria: string }
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { categoria, subcategoria } = params

  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
      (product) =>
        product.category.toLowerCase() === categoria.toLowerCase() &&
        product.subCategory.toLowerCase() === subcategoria.toLowerCase(),
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
    subcategoria,
    searchTerm,
    sortBy,
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
  ])

  const subcategoryProducts = allProducts.filter(
    (p) =>
      p.category.toLowerCase() === categoria.toLowerCase() &&
      p.subCategory.toLowerCase() === subcategoria.toLowerCase(),
  )
  const brands = [...new Set(subcategoryProducts.map((p) => p.brand).filter(Boolean))]
  const sizes = [...new Set(subcategoryProducts.flatMap((p) => p.sizes || []))]
  const colors = [...new Set(subcategoryProducts.flatMap((p) => p.colors || []))]

  const clearFilters = () => {
    setSearchTerm("")
    setPriceRange([0, 500])
    setSelectedBrands([])
    setSelectedSizes([])
    setSelectedColors([])
    setSortBy("relevance")
  }

  const getSubcategoryTitle = (cat: string, subcat: string) => {
    const titles: { [key: string]: { [key: string]: string } } = {
      camisetas: {
        oversized: "Camisetas Oversized",
        longline: "Camisetas Longline",
        "graphic-tee": "Camisetas Graphic Tee",
        "tie-dye": "Camisetas Tie Dye",
        vintage: "Camisetas Vintage/Retro",
        basica: "Camisetas Básica Minimal",
      },
      calcas: {
        cargo: "Calças Cargo",
        jogger: "Calças Jogger",
        "wide-leg": "Calças Wide Leg",
        "jeans-ripped": "Calças Jeans Ripped",
        skinny: "Calças Skinny",
        moletom: "Calças de Moletom",
      },
    }
    return titles[cat]?.[subcat] || `${cat} - ${subcat}`
  }

  return (
    <div className="min-h-screen">
      <Header
        onCategoryClick={() => console.log("Category clicked")}
        onAvatarClick={() => console.log("Avatar clicked")}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getSubcategoryTitle(categoria, subcategoria)}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} produto
            {filteredProducts.length !== 1 ? "s" : ""} encontrado
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-lg border">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5" />
                <h2 className="font-semibold">Filtros</h2>
              </div>

              {/* Busca */}
              <div className="space-y-2 mb-4">
                <Label>Buscar</Label>
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar produtos..."
                />
              </div>

              {/* Preço */}
              <div className="space-y-2 mb-4">
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
              <div className="space-y-2 mb-4">
                <Label>Marcas</Label>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(String(brand))}
                      onCheckedChange={(checked) =>
                        setSelectedBrands(
                          checked
                            ? [...selectedBrands, String(brand)]
                            : selectedBrands.filter((b) => b !== brand),
                        )
                      }
                    />
                    <Label htmlFor={`brand-${brand}`}>{String(brand)}</Label>
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
                        checked={selectedSizes.includes(String(size))}
                        onCheckedChange={(checked) =>
                          setSelectedSizes(
                            checked
                              ? [...selectedSizes, String(size)]
                              : selectedSizes.filter((s) => s !== size),
                          )
                        }
                      />
                      <Label htmlFor={`size-${size}`}>{String(size)}</Label>
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
                      checked={selectedColors.includes(String(color))}
                      onCheckedChange={(checked) =>
                        setSelectedColors(
                          checked
                            ? [...selectedColors, String(color)]
                            : selectedColors.filter((c) => c !== color),
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
          </aside>

          {/* Produtos */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
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
    </div>
  )
}
