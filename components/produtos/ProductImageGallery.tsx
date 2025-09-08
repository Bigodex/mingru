"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ZoomIn } from "lucide-react"

interface ProductImageGalleryProps {
  images?: string[]
  name: string
}

export function ProductImageGallery({ images, name }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      {/* Imagem principal com zoom */}
      <div className="aspect-square overflow-hidden rounded-lg border">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative cursor-zoom-in group">
              <img
                src={images?.[selectedImage] || "/placeholder.svg"}
                alt={name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <img
              src={images?.[selectedImage] || "/placeholder.svg"}
              alt={name}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-4 gap-2">
        {images?.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square overflow-hidden rounded-lg border-2 transition-colors ${
              selectedImage === index ? "border-primary" : "border-border hover:border-primary/50"
            }`}
          >
            <img
              src={image || "/placeholder.svg"}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
