'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CarImage {
  id: string
  url: string
  altText: string | null
}

interface ImageLightboxProps {
  images: CarImage[]
  initialIndex?: number
}

export function ImageLightbox({ images, initialIndex = 0 }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }

  return (
    <>
      {/* Gallery Thumbnails */}
      <div className="space-y-4">
        {/* Primary Image */}
        <div
          className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden cursor-pointer group"
          onClick={() => openLightbox(0)}
        >
          {images[0] && (
            <>
              <Image
                src={images[0].url}
                alt={images[0].altText || ''}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg font-medium text-sm">
                  Click to view full size
                </div>
              </div>
            </>
          )}
        </div>

        {/* Gallery Grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={image.id}
                className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={image.url}
                  alt={image.altText || ''}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100000] bg-black/95 flex items-center justify-center"
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close Button */}
          <Button
            onClick={closeLightbox}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <Button
                onClick={goToPrevious}
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                onClick={goToNext}
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Main Image */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-auto p-8">
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex].url}
                alt={images[currentIndex].altText || ''}
                fill
                className="object-contain"
                quality={100}
              />
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeLightbox}
          />
        </div>
      )}
    </>
  )
}
