"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Search, Camera, Heart, Download, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Photography data (in real app, this would come from a database/API)
const PHOTOGRAPHY_CATEGORIES = [
  { id: "all", label: "Semua Foto", count: 16 },
  { id: "portrait", label: "Portrait", count: 8 },
  { id: "event", label: "Event", count: 5 },
  { id: "street", label: "Street Photography", count: 1 },
  { id: "landscape", label: "Landscape", count: 1 },
  { id: "nature", label: "Nature", count: 1 },
]

const PHOTOGRAPHY_DATA = [
  // Cosplay Portrait Photos
  {
    id: 1,
    title: "Chainsaw Man Cosplay - Aki & Himeno",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-1.webp",
    description: "Sesi foto cosplay Chainsaw Man dengan karakter Aki dan Himeno. Fotografi portrait dengan tema anime yang dramatis.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "portrait", "anime", "chainsaw man"]
  },
  {
    id: 2,
    title: "Cosplay Portrait Session - Character Study",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-2.webp",
    description: "Detail karakter cosplay dengan pencahayaan studio yang dramatis dan mood yang sesuai dengan tema anime.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "portrait", "character", "studio"]
  },
  {
    id: 3,
    title: "Dramatic Cosplay Lighting",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-3.webp",
    description: "Eksplorasi pencahayaan dramatis untuk fotografi cosplay dengan teknik studio lighting yang advanced.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "dramatic lighting", "portrait", "studio"]
  },
  {
    id: 4,
    title: "Character Expression Study",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-4.webp",
    description: "Fokus pada ekspresi karakter dan detail kostum dalam sesi fotografi cosplay professional.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "expression", "character", "detail"]
  },
  {
    id: 5,
    title: "Cosplay Portrait - Close Up",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-5.webp",
    description: "Close-up portrait dengan fokus pada detail makeup dan kostum cosplay yang authentic.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "close-up", "makeup", "detail"]
  },
  {
    id: 6,
    title: "Dynamic Cosplay Pose",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-6.webp",
    description: "Pose dinamis yang menangkap essence karakter dengan komposisi yang kuat dan pencahayaan yang tepat.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "dynamic", "pose", "composition"]
  },
  {
    id: 7,
    title: "Atmospheric Cosplay Portrait",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-7.webp",
    description: "Menciptakan atmosfer yang sesuai dengan karakter melalui pencahayaan dan komposisi yang artistic.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "atmospheric", "artistic", "mood"]
  },
  {
    id: 8,
    title: "Professional Cosplay Documentation",
    category: "portrait",
    image: "/photography/portrait/Cosplay Portrait/cosplay-portrait-8.webp",
    description: "Dokumentasi professional cosplay dengan attention to detail dan teknik fotografi yang advanced.",
    camera: "Canon EOS",
    lens: "85mm f/1.8",
    settings: "f/2.8, 1/125s, ISO 400",
    location: "Studio, Jakarta",
    date: "2024-12-15",
    tags: ["cosplay", "professional", "documentation", "technical"]
  },
  // Event Photography - PDC Pertamina
  {
    id: 9,
    title: "Night Photography - PDC Pertamina Event",
    category: "event",
    image: "/photography/event/PDC Pertamina/pdc-event-1.webp",
    description: "Fotografi malam dengan teknik slow shutter speed untuk menangkap pergerakan dan cahaya di acara PDC Pertamina.",
    camera: "Canon EOS",
    lens: "24-70mm f/2.8",
    settings: "f/4, 1/30s, ISO 800",
    location: "PDC Pertamina, Jakarta",
    date: "2024-11-20",
    tags: ["event", "night photography", "slow shutter", "pertamina"]
  },
  {
    id: 10,
    title: "Low Light Event Documentation",
    category: "event",
    image: "/photography/event/PDC Pertamina/pdc-event-2.webp",
    description: "Dokumentasi acara malam dengan teknik low light photography dan creative shutter speed.",
    camera: "Canon EOS",
    lens: "24-70mm f/2.8",
    settings: "f/4, 1/30s, ISO 800",
    location: "PDC Pertamina, Jakarta",
    date: "2024-11-20",
    tags: ["event", "low light", "documentation", "corporate"]
  },
  {
    id: 11,
    title: "Motion Blur Artistic Shot",
    category: "event",
    image: "/photography/event/PDC Pertamina/pdc-event-3.webp",
    description: "Eksplorasi artistik dengan motion blur dan slow shutter untuk menciptakan efek visual yang menarik.",
    camera: "Canon EOS",
    lens: "24-70mm f/2.8",
    settings: "f/4, 1/15s, ISO 800",
    location: "PDC Pertamina, Jakarta",
    date: "2024-11-20",
    tags: ["event", "motion blur", "artistic", "creative"]
  },
  {
    id: 12,
    title: "Event Atmosphere Capture",
    category: "event",
    image: "/photography/event/PDC Pertamina/pdc-event-4.webp",
    description: "Menangkap atmosfer dan energy dari acara malam dengan teknik fotografi yang advanced.",
    camera: "Canon EOS",
    lens: "24-70mm f/2.8",
    settings: "f/4, 1/30s, ISO 800",
    location: "PDC Pertamina, Jakarta",
    date: "2024-11-20",
    tags: ["event", "atmosphere", "energy", "night"]
  },
  {
    id: 13,
    title: "Dynamic Event Photography",
    category: "event",
    image: "/photography/event/PDC Pertamina/pdc-event-5.webp",
    description: "Fotografi event yang dinamis dengan kombinasi teknik slow shutter dan framing yang tepat.",
    camera: "Canon EOS",
    lens: "24-70mm f/2.8",
    settings: "f/4, 1/30s, ISO 800",
    location: "PDC Pertamina, Jakarta",
    date: "2024-11-20",
    tags: ["event", "dynamic", "framing", "technique"]
  },
  // Sample data for demonstration (can be replaced with actual landscape/street/nature photos)
  {
    id: 14,
    title: "Urban Life",
    category: "street",
    image: "/placeholder.jpg",
    description: "Kehidupan urban yang captured dalam momen spontan dan autentik.",
    camera: "Fujifilm X-T4",
    lens: "35mm f/1.4",
    settings: "f/2.8, 1/60s, ISO 800",
    location: "Jakarta, Indonesia",
    date: "2024-03-10",
    tags: ["street", "urban", "candid"]
  },
  {
    id: 15,
    title: "Mountain Landscape",
    category: "landscape",
    image: "/placeholder.jpg",
    description: "Pemandangan pegunungan dengan komposisi yang memukau di pagi hari.",
    camera: "Sony A7R IV",
    lens: "24-70mm f/2.8",
    settings: "f/8, 1/125s, ISO 200",
    location: "Bromo, Jawa Timur",
    date: "2024-02-20",
    tags: ["landscape", "mountain", "sunrise"]
  },
  {
    id: 16,
    title: "Nature Close-up",
    category: "nature",
    image: "/placeholder.jpg",
    description: "Detail alam yang indah dengan teknik macro photography.",
    camera: "Nikon Z7 II",
    lens: "105mm Macro",
    settings: "f/5.6, 1/320s, ISO 400",
    location: "Bogor, Indonesia",
    date: "2024-05-12",
    tags: ["macro", "nature", "detail"]
  }
]

export default function PhotographyPage() {
  // State management
  const [photos, setPhotos] = useState(PHOTOGRAPHY_DATA)
  const [filteredPhotos, setFilteredPhotos] = useState(PHOTOGRAPHY_DATA)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOGRAPHY_DATA[0] | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [likes, setLikes] = useState<Record<number, boolean>>({})

  // Filter photos
  useEffect(() => {
    let filtered = photos

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(photo => photo.category === activeCategory)
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(photo =>
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredPhotos(filtered)
  }, [photos, activeCategory, searchQuery])

  const openLightbox = (photo: typeof PHOTOGRAPHY_DATA[0]) => {
    setSelectedPhoto(photo)
    const index = filteredPhotos.findIndex(p => p.id === photo.id)
    setCurrentPhotoIndex(index)
  }

  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  const navigatePhoto = (direction: "prev" | "next") => {
    const newIndex = direction === "prev" 
      ? (currentPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      : (currentPhotoIndex + 1) % filteredPhotos.length
    
    setCurrentPhotoIndex(newIndex)
    setSelectedPhoto(filteredPhotos[newIndex])
  }

  const toggleLike = (photoId: number) => {
    setLikes(prev => ({
      ...prev,
      [photoId]: !prev[photoId]
    }))
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedPhoto) {
      if (e.key === "Escape") closeLightbox()
      if (e.key === "ArrowLeft") navigatePhoto("prev")
      if (e.key === "ArrowRight") navigatePhoto("next")
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedPhoto, currentPhotoIndex])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <img 
                  src="/logo.svg" 
                  alt="Faiz Abhinaya Logo" 
                  className="w-6 h-6"
                />
              </Link>
              <Link href="/">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <Camera size={20} className="text-blue-600 dark:text-blue-400" />
                  Portfolio Fotografi
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredPhotos.length} dari {photos.length} foto
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Cari foto berdasarkan judul, deskripsi, atau tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {PHOTOGRAPHY_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.label}
                <span className="text-xs opacity-70">({category.count})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Photos Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Camera size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Tidak ada foto ditemukan
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Coba ubah kata kunci pencarian atau kategori yang dipilih
            </p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveCategory("all") }}>
              Lihat Semua Foto
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <Card
                key={photo.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                onClick={() => openLightbox(photo)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-white text-center p-4">
                        <h3 className="text-sm font-semibold mb-1">{photo.title}</h3>
                        <p className="text-xs opacity-80 line-clamp-2">{photo.description}</p>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-white hover:bg-white/20"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleLike(photo.id)
                        }}
                      >
                        <Heart
                          size={16}
                          className={likes[photo.id] ? "fill-red-500 text-red-500" : ""}
                        />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-5xl max-h-full w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 h-10 w-10 p-0"
              onClick={closeLightbox}
            >
              <X size={20} />
            </Button>

            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-10 w-10 p-0"
              onClick={() => navigatePhoto("prev")}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 h-10 w-10 p-0"
              onClick={() => navigatePhoto("next")}
            >
              <ChevronRight size={20} />
            </Button>

            <div className="grid md:grid-cols-3 gap-6 h-full">
              {/* Image */}
              <div className="md:col-span-2 flex items-center justify-center">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>

              {/* Photo Details */}
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 overflow-y-auto max-h-[80vh]">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedPhoto.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedPhoto.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Kamera:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedPhoto.camera}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Lensa:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedPhoto.lens}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Settings:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedPhoto.settings}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Lokasi:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {selectedPhoto.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Tanggal:</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {new Date(selectedPhoto.date).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPhoto.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      variant={likes[selectedPhoto.id] ? "default" : "outline"}
                      size="sm"
                      className="flex-1"
                      onClick={() => toggleLike(selectedPhoto.id)}
                    >
                      <Heart
                        size={16}
                        className={`mr-2 ${likes[selectedPhoto.id] ? "fill-current" : ""}`}
                      />
                      {likes[selectedPhoto.id] ? "Liked" : "Like"}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download size={16} className="mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
                    {currentPhotoIndex + 1} dari {filteredPhotos.length} foto
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
