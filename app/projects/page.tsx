"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, ExternalLink, Github, Search, Filter, Code, Globe, Smartphone, X, Download, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

// Import API functions and types
import { getProjects, getProjectDetails, getProjectImages } from "@/lib/api"
import type { Project } from "@/lib/supabase"

const PROJECT_CATEGORIES = [
  { id: "all", label: "Semua Proyek", icon: Code },
  { id: "web", label: "Web Development", icon: Globe },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
]

const TECH_FILTERS = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python", "PHP", 
  "MySQL", "PostgreSQL", "MongoDB", "Supabase", "Firebase", "Tailwind CSS"
]

export default function ProjectsPage() {
  // State management
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTechs, setSelectedTechs] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Fetch projects data
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true)
      try {
        const projectsData = await getProjects()
        setProjects(projectsData)
        setFilteredProjects(projectsData)
      } catch (error) {
        console.error("Error fetching projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects
  useEffect(() => {
    let filtered = projects

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(project => 
        project.type.toLowerCase().includes(activeCategory.toLowerCase())
      )
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tech.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Tech filter
    if (selectedTechs.length > 0) {
      filtered = filtered.filter(project =>
        selectedTechs.every(tech => 
          project.tech.some(projectTech => 
            projectTech.toLowerCase().includes(tech.toLowerCase())
          )
        )
      )
    }

    setFilteredProjects(filtered)
  }, [projects, activeCategory, searchQuery, selectedTechs])

  const toggleTechFilter = (tech: string) => {
    setSelectedTechs(prev =>
      prev.includes(tech)
        ? prev.filter(t => t !== tech)
        : [...prev, tech]
    )
  }

  const clearAllFilters = () => {
    setActiveCategory("all")
    setSearchQuery("")
    setSelectedTechs([])
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Memuat proyek...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800 sticky top-0 z-50">
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
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Semua Proyek</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {filteredProjects.length} dari {projects.length} proyek
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
              placeholder="Cari proyek berdasarkan nama, deskripsi, atau teknologi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {PROJECT_CATEGORIES.map((category) => {
              const IconComponent = category.icon
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <IconComponent size={16} />
                  {category.label}
                </Button>
              )
            })}
          </div>

          {/* Tech Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter size={16} />
              Filter Teknologi
              {selectedTechs.length > 0 && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  {selectedTechs.length}
                </span>
              )}
            </Button>
            {(activeCategory !== "all" || searchQuery || selectedTechs.length > 0) && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Bersihkan Filter
              </Button>
            )}
          </div>

          {/* Tech Filters */}
          {showFilters && (
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Filter berdasarkan teknologi:
              </p>
              <div className="flex flex-wrap gap-2">
                {TECH_FILTERS.map((tech) => (
                  <Button
                    key={tech}
                    variant={selectedTechs.includes(tech) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleTechFilter(tech)}
                    className="text-xs"
                  >
                    {tech}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Code size={48} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Tidak ada proyek ditemukan
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Coba ubah kata kunci pencarian atau filter yang digunakan
            </p>
            <Button variant="outline" onClick={clearAllFilters}>
              Bersihkan Semua Filter
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-gray-900 border-0 shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Code className="text-white" size={48} />
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm rounded-full text-sm font-medium">
                      {project.type}
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.period}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      className="flex-1"
                      onClick={() => setSelectedProject(project)}
                    >
                      <ExternalLink size={14} className="mr-2" />
                      Lihat Detail
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => {
        setSelectedProject(null)
        setCurrentImageIndex(0)
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white pr-8">
                  {selectedProject.title}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Project Image Carousel */}
                {(() => {
                  const images = getProjectImages(selectedProject.id)
                  const isMyMovieList = selectedProject.id === "1"
                  
                  if (images.length === 0) {
                    return (
                      <div className="w-full h-64 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <Code className="text-white" size={48} />
                      </div>
                    )
                  }

                  if (isMyMovieList) {
                    // Layout horizontal untuk myMovieList (mobile app screenshots)
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Image Section */}
                        <div className="relative group">
                          <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                            <img
                              src={images[currentImageIndex]?.url}
                              alt={images[currentImageIndex]?.title}
                              className="h-full w-auto object-contain"
                            />
                          </div>

                          {/* Navigation Arrows */}
                          {images.length > 1 && (
                            <>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0"
                                onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                              >
                                <ChevronLeft size={16} />
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0"
                                onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                              >
                                <ChevronRight size={16} />
                              </Button>
                            </>
                          )}

                          {/* Image Counter */}
                          {images.length > 1 && (
                            <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                              {currentImageIndex + 1} / {images.length}
                            </div>
                          )}
                        </div>

                        {/* Info Section */}
                        <div className="flex flex-col justify-center space-y-4">
                          <div>
                            <h5 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {images[currentImageIndex]?.title}
                            </h5>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                              {images[currentImageIndex]?.description}
                            </p>
                          </div>

                          {/* Thumbnail Navigation */}
                          {images.length > 1 && (
                            <div className="space-y-3">
                              <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">Screenshots:</h6>
                              <div className="grid grid-cols-3 gap-2">
                                {images.map((image, index) => (
                                  <button
                                    key={index}
                                    className={`relative aspect-[9/16] rounded border-2 transition-colors overflow-hidden ${
                                      index === currentImageIndex
                                        ? 'border-blue-500'
                                        : 'border-gray-200 dark:border-gray-700'
                                    }`}
                                    onClick={() => setCurrentImageIndex(index)}
                                  >
                                    <img
                                      src={image.url}
                                      alt={image.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Dots Indicator */}
                          {images.length > 1 && (
                            <div className="flex justify-center gap-2">
                              {images.map((_, index) => (
                                <button
                                  key={index}
                                  className={`w-2 h-2 rounded-full transition-colors ${
                                    index === currentImageIndex
                                      ? 'bg-blue-600 dark:bg-blue-400'
                                      : 'bg-gray-300 dark:bg-gray-600'
                                  }`}
                                  onClick={() => setCurrentImageIndex(index)}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  }

                  // Layout default untuk proyek web (landscape images)
                  return (
                    <div className="relative group">
                      {/* Main Image */}
                      <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                        <img
                          src={images[currentImageIndex]?.url}
                          alt={images[currentImageIndex]?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Navigation Arrows */}
                      {images.length > 1 && (
                        <>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0"
                            onClick={() => setCurrentImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1)}
                          >
                            <ChevronLeft size={16} />
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white border-0"
                            onClick={() => setCurrentImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1)}
                          >
                            <ChevronRight size={16} />
                          </Button>
                        </>
                      )}

                      {/* Image Info */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
                        <h5 className="text-white font-semibold text-sm mb-1">
                          {images[currentImageIndex]?.title}
                        </h5>
                        <p className="text-white/80 text-xs">
                          {images[currentImageIndex]?.description}
                        </p>
                      </div>

                      {/* Dots Indicator */}
                      {images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-3">
                          {images.map((_, index) => (
                            <button
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors ${
                                index === currentImageIndex
                                  ? 'bg-blue-600 dark:bg-blue-400'
                                  : 'bg-gray-300 dark:bg-gray-600'
                              }`}
                              onClick={() => setCurrentImageIndex(index)}
                            />
                          ))}
                        </div>
                      )}

                      {/* Image Counter */}
                      {images.length > 1 && (
                        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                          {currentImageIndex + 1} / {images.length}
                        </div>
                      )}
                    </div>
                  )
                })()}

                {/* Project Info */}
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                      {selectedProject.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedProject.period}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedProject.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {(() => {
                      const projectDetails = getProjectDetails(selectedProject.id)
                      return (
                        <>
                          {projectDetails.githubUrl && (
                            <Button
                              variant="outline"
                              className="flex-1"
                              onClick={() => window.open(projectDetails.githubUrl, "_blank")}
                            >
                              <Github size={16} className="mr-2" />
                              GitHub Repository
                            </Button>
                          )}
                          {projectDetails.liveUrl && (
                            <Button
                              variant="default"
                              className="flex-1"
                              onClick={() => window.open(projectDetails.liveUrl, "_blank")}
                            >
                              <Globe size={16} className="mr-2" />
                              Live Demo
                            </Button>
                          )}
                          {projectDetails.driveUrl && (
                            <Button
                              variant="secondary"
                              className="flex-1"
                              onClick={() => window.open(projectDetails.driveUrl, "_blank")}
                            >
                              <Download size={16} className="mr-2" />
                              Download APK
                            </Button>
                          )}
                        </>
                      )
                    })()}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
