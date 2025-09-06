"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const bannerImages = [
  {
    id: 1,
    image: "/Banners/nike.svg",
    buttonText: "Ver Coleção Nike",
  },
  {
    id: 2,
    image: "/Banners/puma.svg",
    buttonText: "Explorar Puma",
  },
  {
    id: 3,
    image: "/Banners/vans.svg",
    buttonText: "Conferir Vans",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
  }

  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Banner Images */}
      <div className="relative h-full">
        {bannerImages.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner.image || "/placeholder.svg"}
              alt={banner.buttonText}
              className="w-full h-full object-cover"
            />

            {/* Botão em cada imagem */}
            <div className="absolute bottom-8 left-8">
              <Button size="lg" className="shadow-lg">
                {banner.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-primary" : "bg-white/50"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
