"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Github, Linkedin, Instagram, ExternalLink, Menu, X, Moon, Sun, Camera, Code } from "lucide-react"

// Import API functions and types
import {
  getPersonalInfo,
  getProjects,
  getExperiences,
  getSkillsByCategory,
  getLanguages,
  getSoftSkills,
} from "@/lib/api"
import type { PersonalInfo, Project, Experience, Skill, Language, SoftSkill } from "@/lib/supabase"

const NAVIGATION_ITEMS = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "skills", label: "Keahlian" },
  { id: "experience", label: "Pengalaman" },
  { id: "projects", label: "Proyek" },
  { id: "photography", label: "Fotografi" },
  { id: "contact", label: "Kontak" },
]

export default function Portfolio() {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Data state
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [skillsByCategory, setSkillsByCategory] = useState<Record<string, Skill[]>>({})
  const [languages, setLanguages] = useState<Language[]>([])
  const [softSkills, setSoftSkills] = useState<SoftSkill[]>([])

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [personalInfoData, projectsData, experiencesData, skillsData, languagesData, softSkillsData] =
          await Promise.all([
            getPersonalInfo(),
            getProjects(),
            getExperiences(),
            getSkillsByCategory(),
            getLanguages(),
            getSoftSkills(),
          ])

        setPersonalInfo(personalInfoData)
        setProjects(projectsData)
        setExperiences(experiencesData)
        setSkillsByCategory(skillsData)
        setLanguages(languagesData)
        setSoftSkills(softSkillsData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Theme Management
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDarkMode(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION_ITEMS.map((item) => item.id)
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation Helper
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // Skill Category Icons
  const getSkillIcon = (category: string) => {
    const icons = {
      Frontend: <Code className="text-blue-600 dark:text-blue-400" size={20} />,
      Backend: (
        <svg
          className="text-green-600 dark:text-green-400"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
        </svg>
      ),
      Database: (
        <svg
          className="text-purple-600 dark:text-purple-400"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4zM4 16v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z" />
        </svg>
      ),
      "Tools & Design": (
        <svg
          className="text-orange-600 dark:text-orange-400"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ),
    }
    return icons[category as keyof typeof icons]
  }

  const getSkillColor = (category: string) => {
    const colors = {
      Frontend: "blue",
      Backend: "green",
      Database: "purple",
      "Tools & Design": "orange",
    }
    return colors[category as keyof typeof colors]
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Memuat portfolio...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400">Gagal memuat data portfolio</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-3">
                <img 
                  src="/logo.svg" 
                  alt="Faiz Abhinaya Logo" 
                  className="w-8 h-8"
                />
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">{personalInfo.name}</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8 items-center">
                {NAVIGATION_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`capitalize transition-all duration-200 hover:scale-105 ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="ml-4">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={toggleDarkMode}>
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
              <div className="px-4 py-2 space-y-1">
                {NAVIGATION_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                      activeSection === item.id
                        ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
            <div className="text-center">
              <div className="flex justify-center items-center gap-4 mb-6">
                <Code className="text-blue-600 dark:text-blue-400" size={32} />
                <Camera className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h1 className="text-4xl sm:text-6xl font-light text-gray-900 dark:text-white mb-6">
                Halo, Saya <span className="font-medium text-blue-600 dark:text-blue-400">{personalInfo.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-4xl mx-auto">
                {personalInfo.title}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                {personalInfo.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => scrollToSection("projects")}
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3"
                >
                  Lihat Proyek Saya
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("contact")}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 px-8 py-3"
                >
                  Hubungi Saya
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4">Tentang Saya</h2>
              <div className="w-20 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Mengenal lebih dekat perjalanan, passion, dan visi saya dalam dunia teknologi dan fotografi.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="relative w-64 h-64 mx-auto mb-4">
                  <img
                    src={personalInfo.profile_image_url || "/profile-photo.jpg"}
                    alt={personalInfo.name}
                    className="w-full h-full rounded-full object-cover shadow-lg"
                    style={{ 
                      objectPosition: '50% 15%',
                      transform: 'scale(1.1)',
                      transformOrigin: 'center 30%'
                    }}
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {personalInfo.name}
                </p>
              </div>
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-4">
                  {personalInfo.description}
                </p>
                <div className="flex gap-4 pt-4">
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Code size={20} />
                    <span className="font-medium">Web Developer</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Camera size={20} />
                    <span className="font-medium">Fotografer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4">Keahlian</h2>
              <div className="w-20 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
            </div>

            {/* Technical Skills Cards */}
            <div className="mb-16">
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">Keahlian Teknis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Object.entries(skillsByCategory).map(([category, skills]) => (
                  <Card
                    key={category}
                    className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-10 h-10 bg-${getSkillColor(category)}-100 dark:bg-${getSkillColor(category)}-900/30 rounded-lg flex items-center justify-center`}
                        >
                          {getSkillIcon(category)}
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{category}</h4>
                      </div>
                      <div className="space-y-3">
                        {skills.map((skill) => (
                          <div
                            key={skill.id}
                            className={`flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-${getSkillColor(category)}-50 dark:hover:bg-${getSkillColor(category)}-900/20 transition-colors duration-200`}
                          >
                            <span className="text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
                            <div className={`w-2 h-2 bg-${getSkillColor(category)}-500 rounded-full`}></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Languages Cards */}
            {languages.length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">Bahasa</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                  {languages.map((lang) => (
                    <Card
                      key={lang.id}
                      className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">{lang.flag_emoji}</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{lang.name}</h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">{lang.level}</p>
                        <div className="mt-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${lang.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Soft Skills Cards */}
            {softSkills.length > 0 && (
              <div>
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-8 text-center">Soft Skills</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
                  {softSkills.map((skill) => (
                    <Card
                      key={skill.id}
                      className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 bg-${skill.color}-100 dark:bg-${skill.color}-900/30 rounded-lg flex items-center justify-center`}
                          >
                            <span className="text-lg">{skill.icon}</span>
                          </div>
                          <span className={`text-${skill.color}-700 dark:text-${skill.color}-300 font-medium`}>
                            {skill.name}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4">Pengalaman</h2>
              <div className="w-20 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto"></div>
            </div>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <Card
                  key={exp.id}
                  className="border-l-4 border-l-blue-600 dark:border-l-blue-400 bg-white dark:bg-gray-900"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.title}</h3>
                      <span className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4">Proyek Unggulan</h2>
              <div className="w-20 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Beberapa proyek terbaik yang menunjukkan kemampuan dan pengalaman saya dalam pengembangan web.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 3).map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white dark:bg-gray-900 border-0 shadow-lg overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 relative">
                    {project.image_url ? (
                      <img
                        src={project.image_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-black/20"></div>
                    )}
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                        {project.type}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{project.period}</p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                          +{project.tech.length - 3} more
                        </span>
                      )}
                    </div>
                    {project.link && (
                      <Button
                        variant="ghost"
                        className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        onClick={() => window.open('/projects', '_self')}
                      >
                        Lihat Detail <ExternalLink size={16} className="ml-2" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* View All Projects Button */}
            <div className="text-center mt-12">
              <Button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 flex items-center gap-2 mx-auto"
                onClick={() => window.open('/projects', '_self')}
              >
                <Code size={20} />
                Lihat Semua Proyek ({projects.length})
              </Button>
            </div>
          </div>
        </section>

        {/* Photography Section */}
        <section id="photography" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                <Camera className="text-blue-600 dark:text-blue-400" size={36} />
                Portfolio Fotografi
              </h2>
              <div className="w-20 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Menangkap momen indah melalui lensa. Koleksi karya fotografi terpilih yang menceritakan berbagai emosi dan perspektif.
              </p>
            </div>

            {/* Photography Preview Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Featured Photography Items */}
              {[
                {
                  id: 1,
                  title: "Golden Hour Portrait",
                  category: "Portrait",
                  image: "/placeholder.jpg",
                },
                {
                  id: 2,
                  title: "Mountain Landscape",
                  category: "Landscape", 
                  image: "/placeholder.jpg",
                },
                {
                  id: 3,
                  title: "Urban Life",
                  category: "Street",
                  image: "/placeholder.jpg",
                },
                {
                  id: 4,
                  title: "Wedding Moment",
                  category: "Event",
                  image: "/placeholder.jpg",
                },
                {
                  id: 5,
                  title: "Nature Close-up",
                  category: "Landscape",
                  image: "/placeholder.jpg",
                },
                {
                  id: 6,
                  title: "Creative Portrait",
                  category: "Portrait",
                  image: "/placeholder.jpg",
                }
              ].slice(0, 6).map((photo) => (
                <Card
                  key={photo.id}
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-0"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={photo.image}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center p-4">
                        <h3 className="text-sm font-semibold mb-1">{photo.title}</h3>
                        <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* View Full Gallery Button */}
            <div className="text-center mt-12">
              <Button
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 flex items-center gap-2 mx-auto"
                onClick={() => window.open('/photography', '_self')}
              >
                <Camera size={20} />
                Jelajahi Galeri Lengkap
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-light text-gray-900 dark:text-white mb-4">Mari Berkolaborasi</h2>
              <div className="w-20 h-0.5 bg-blue-600 dark:bg-blue-400 mx-auto mb-8"></div>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Saya selalu terbuka untuk proyek baru, peluang kolaborasi yang menarik, dan diskusi tentang teknologi
                web development maupun fotografi. Mari berkarya bersama!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex gap-4">
                {personalInfo.github_url && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
                    onClick={() => window.open(personalInfo.github_url, "_blank")}
                  >
                    <Github size={20} />
                  </Button>
                )}
                {personalInfo.linkedin_url && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
                    onClick={() => window.open(personalInfo.linkedin_url, "_blank")}
                  >
                    <Linkedin size={20} />
                  </Button>
                )}
                {personalInfo.instagram_url && (
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20 bg-transparent"
                    onClick={() => window.open(personalInfo.instagram_url, "_blank")}
                  >
                    <Instagram size={20} />
                  </Button>
                )}
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-2">Atau hubungi saya langsung:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">📧 {personalInfo.email}</span>
                {personalInfo.phone && (
                  <span className="text-gray-600 dark:text-gray-300">📱 {personalInfo.phone}</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-gray-400 dark:text-gray-500">
              © 2025 {personalInfo.name}. Dibuat dengan ❤️ menggunakan Next.js, TypeScript, dan Tailwind CSS.
            </p>
            <p className="text-gray-500 dark:text-gray-600 text-sm mt-2">
              Web Developer • Fotografer • Mahasiswa Sistem Informasi
            </p>
          </div>
        </footer>
      </div>

      {/* Floating Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => scrollToSection("contact")}
        >
          <Mail size={24} />
        </Button>
      </div>
    </div>
  )
}
