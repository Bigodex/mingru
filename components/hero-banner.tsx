"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const bannerImages = [
  {
    id: 1,
    image: "/Banners/nike.svg",
    buttonText: "Ver Coleção Nike",
    buttonPosition: "left-8 bottom-12 md:left-[95px] md:bottom-[40px] border border-border rounded-lg",
    link: "/categories/Calcados/nike",
  },
  {
    id: 2,
    image: "/Banners/puma.svg",
    buttonText: "Explorar Puma",
    buttonPosition: "top-[110px] left-[37%] -translate-x-[45%] md:top-[95px] md:left-[35%] md:-translate-x-[65%] rounded-lg border border-border",
    link: "/categories/Calcados/puma",
  },
  {
    id: 3,
    image: "/Banners/vans.svg",
    buttonText: "Conferir Vans",
    buttonPosition: "left-1/2 -translate-x-1/2 bottom-20 rounded-lg",
    link: "/categories/Calcados/vans",
  },
]

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)
  const minSwipeDistance = 50
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => setCurrentSlide(index)
  const goToPrevious = () => setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  const goToNext = () => setCurrentSlide((prev) => (prev + 1) % bannerImages.length)

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null)
    setTouchStartX(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return
    const distance = touchStartX - touchEndX
    if (Math.abs(distance) > minSwipeDistance) {
      distance > 0 ? goToNext() : goToPrevious()
    }
  }

  return (
    <section className="relative h-[400px] overflow-hidden px-4 md:px-0 mt-4 md:mt-0 rounded-b-[10px] md:rounded-b-none">
      <div
        className="relative h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
              className="w-full h-full object-cover rounded-b-[10px] rounded-t-[10px] md:rounded-none"
            />

            {/* overlay to darken the image */}
            <div className="absolute inset-0 bg-black/30 bg-opacity-40 rounded-b-[10px] rounded-t-[10px] md:rounded-none" />

            {/* center the button both on mobile and web */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="shadow-lg"
                onClick={() => router.push(banner.link)}
              >
                {banner.buttonText}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
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

      {/* Indicadores */}
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
