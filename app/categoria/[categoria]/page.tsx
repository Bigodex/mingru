"use client"

import { useState, useMemo } from "react"
import { use } from "react"
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

// Mock products data with categories
const allProducts = [
  // Masculino - Camisetas
  {
    id: 1,
    name: "Camiseta Oversized Preta",
    description: "Camiseta streetwear com fit oversized",
    price: 89.9,
    image: "/black-oversized-streetwear-t-shirt.jpg",
    category: "masculino",
    subcategory: "camisetas",
    brand: "StreetStyle",
    size: ["P", "M", "G", "GG"],
    color: "Preto",
  },
  {
    id: 7,
    name: "Camiseta Tie Dye",
    description: "Camiseta com estampa tie dye",
    price: 99.9,
    image: "/tie-dye-t-shirt-streetwear.jpg",
    category: "masculino",
    subcategory: "camisetas",
    brand: "Urban",
    size: ["P", "M", "G"],
    color: "Multicolor",
  },
  {
    id: 8,
    name: "Camiseta Vintage Band",
    description: "Camiseta vintage de banda",
    price: 119.9,
    image: "/vintage-band-t-shirt-streetwear.jpg",
    category: "masculino",
    subcategory: "camisetas",
    brand: "Vintage",
    size: ["M", "G", "GG"],
    color: "Preto",
  },

  // Masculino - Calças
  {
    id: 3,
    name: "Calça Cargo Bege",
    description: "Calça cargo com múltiplos bolsos",
    price: 199.9,
    image: "/beige-cargo-pants-streetwear.jpg",
    category: "masculino",
    subcategory: "calcas",
    brand: "StreetStyle",
    size: ["38", "40", "42", "44"],
    color: "Bege",
  },
  {
    id: 11,
    name: "Calça Wide Leg",
    description: "Calça com pernas largas",
    price: 179.9,
    image: "/wide-leg-pants-streetwear.jpg",
    category: "masculino",
    subcategory: "calcas",
    brand: "Urban",
    size: ["38", "40", "42"],
    color: "Preto",
  },
  {
    id: 13,
    name: "Calça Ripped Jeans",
    description: "Jeans rasgado estilo urbano",
    price: 219.9,
    image: "/ripped-jeans-streetwear.jpg",
    category: "masculino",
    subcategory: "calcas",
    brand: "Denim Co",
    size: ["38", "40", "42", "44"],
    color: "Azul",
  },

  // Masculino - Jaquetas
  {
    id: 4,
    name: "Jaqueta Bomber Verde",
    description: "Jaqueta bomber estilo militar",
    price: 249.9,
    image: "/green-bomber-jacket-streetwear.jpg",
    category: "masculino",
    subcategory: "jaquetas",
    brand: "Military",
    size: ["M", "G", "GG"],
    color: "Verde",
  },
  {
    id: 14,
    name: "Jaqueta Denim",
    description: "Jaqueta jeans clássica",
    price: 189.9,
    image: "/denim-jacket-streetwear.jpg",
    category: "masculino",
    subcategory: "jaquetas",
    brand: "Denim Co",
    size: ["P", "M", "G"],
    color: "Azul",
  },

  // Feminino - Cropped
  {
    id: 20,
    name: "Cropped Tie Dye",
    description: "Cropped com estampa tie dye",
    price: 79.9,
    image: "/placeholder.svg?height=300&width=250",
    category: "feminino",
    subcategory: "cropped",
    brand: "Urban",
    size: ["PP", "P", "M", "G"],
    color: "Rosa",
  },
  {
    id: 21,
    name: "Cropped Básico Branco",
    description: "Cropped básico algodão",
    price: 59.9,
    image: "/placeholder.svg?height=300&width=250",
    category: "feminino",
    subcategory: "cropped",
    brand: "Basic",
    size: ["PP", "P", "M"],
    color: "Branco",
  },

  // Feminino - Vestidos
  {
    id: 22,
    name: "Vestido Oversized",
    description: "Vestido oversized streetwear",
    price: 149.9,
    image: "/placeholder.svg?height=300&width=250",
    category: "feminino",
    subcategory: "vestidos",
    brand: "StreetStyle",
    size: ["P", "M", "G"],
    color: "Preto",
  },

  // Unissex - Oversized
  {
    id: 2,
    name: "Hoodie Urban Style",
    description: "Moletom com capuz estilo urbano",
    price: 159.9,
    image: "/urban-style-hoodie-streetwear.jpg",
    category: "unissex",
    subcategory: "oversized",
    brand: "Urban",
    size: ["P", "M", "G", "GG"],
    color: "Cinza",
  },
  {
    id: 15,
    name: "Jaqueta Puffer",
    description: "Jaqueta puffer oversized",
    price: 329.9,
    image: "/puffer-jacket-oversized-streetwear.jpg",
    category: "unissex",
    subcategory: "oversized",
    brand: "Winter",
    size: ["M", "G", "GG"],
    color: "Preto",
  },

  // Unissex - Calças Largas
  {
    id: 12,
    name: "Calça Jogger",
    description: "Calça jogger confortável",
    price: 149.9,
    image: "/jogger-pants-streetwear.jpg",
    category: "unissex",
    subcategory: "calcas-largas",
    brand: "Comfort",
    size: ["P", "M", "G"],
    color: "Cinza",
  },

  // Novidades - Drops
  {
    id: 9,
    name: "Camiseta Graffiti",
    description: "Camiseta com arte graffiti",
    price: 109.9,
    image: "/graffiti-art-t-shirt-streetwear.jpg",
    category: "novidades",
    subcategory: "drops",
    brand: "Art",
    size: ["P", "M", "G"],
    color: "Branco",
  },
  {
    id: 10,
    name: "Camiseta Neon",
    description: "Camiseta com detalhes neon",
    price: 129.9,
    image: "/neon-details-t-shirt-streetwear.jpg",
    category: "novidades",
    subcategory: "drops",
    brand: "Neon",
    size: ["M", "G", "GG"],
    color: "Preto",
  },
]

interface CategoryPageProps {
  params: Promise<{ categoria: string }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = use(params)
  const { categoria } = resolvedParams

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter products based on category and filters
  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => product.category === categoria)

    // Search filter
    if (searchTerm) {
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Price filter
    products = products.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Brand filter
    if (selectedBrands.length > 0) {
      products = products.filter((product) => selectedBrands.includes(product.brand))
    }

    // Size filter
    if (selectedSizes.length > 0) {
      products = products.filter((product) => product.size.some((size) => selectedSizes.includes(size)))
    }

    // Color filter
    if (selectedColors.length > 0) {
      products = products.filter((product) => selectedColors.includes(product.color))
    }

    // Sort products
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
  }, [categoria, searchTerm, sortBy, priceRange, selectedBrands, selectedSizes, selectedColors])

  // Get unique values for filters
  const brands = [...new Set(allProducts.filter((p) => p.category === categoria).map((p) => p.brand))]
  const sizes = [...new Set(allProducts.filter((p) => p.category === categoria).flatMap((p) => p.size))]
  const colors = [...new Set(allProducts.filter((p) => p.category === categoria).map((p) => p.color))]

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand])
    } else {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
    }
  }

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setSelectedSizes([...selectedSizes, size])
    } else {
      setSelectedSizes(selectedSizes.filter((s) => s !== size))
    }
  }

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) {
      setSelectedColors([...selectedColors, color])
    } else {
      setSelectedColors(selectedColors.filter((c) => c !== color))
    }
  }

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
    }
    return titles[cat] || cat
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Buscar</Label>
        <Input
          id="search"
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Price Range */}
      <div className="space-y-2">
        <Label>
          Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
        </Label>
        <Slider value={priceRange} onValueChange={setPriceRange} max={500} min={0} step={10} className="w-full" />
      </div>

      {/* Brands */}
      <div className="space-y-2">
        <Label>Marcas</Label>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-2">
        <Label>Tamanhos</Label>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-2">
        <Label>Cores</Label>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) => handleColorChange(color, checked as boolean)}
              />
              <Label htmlFor={`color-${color}`} className="text-sm">
                {color}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        Limpar Filtros
      </Button>
    </div>
  )

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

        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card p-6 rounded-lg border">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="h-5 w-5" />
                <h2 className="font-semibold">Filtros</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden bg-transparent">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filtros</SheetTitle>
                      <SheetDescription>Refine sua busca usando os filtros abaixo</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevância</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                    <SelectItem value="name">Nome A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Nenhum produto encontrado com os filtros selecionados.</p>
                <Button onClick={clearFilters}>Limpar filtros</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
