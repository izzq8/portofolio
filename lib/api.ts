import type { PersonalInfo, Project, Experience, Skill, Language, SoftSkill } from "./supabase"

// Mock data - akan digunakan sampai Supabase dikonfigurasi dengan benar
const mockPersonalInfo: PersonalInfo = {
  id: "1",
  name: "Faiz Abhinaya",
  title: "Web Developer & Fotografer",
  description:
    "Mahasiswa Sistem Informasi dengan IPK 3.85 dan sertifikasi BNSP Junior Web Developer. Berpengalaman dalam pengembangan aplikasi web modern dan fotografi profesional.",
  email: "abhinayafa4@gmail.com",
  phone: "+62 812-9162-6459",
  github_url: "https://github.com/izzq8",
  linkedin_url: "https://www.linkedin.com/in/faiz-abhinaya/",
  instagram_url: "https://www.instagram.com/trash.heic",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "myMovieList",
    description: "Aplikasi Android untuk menjelajahi dan mengelola katalog film dengan arsitektur MVVM",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "TMDB API", "MVVM"],
    period: "Mei 2025 – Juni 2025",
    type: "Mobile Development",
    link: "https://drive.google.com/drive/folders/1ijhXOk5wg98XeXq5wytQxKWtj32o-xtM",
    image_url: "/projects/myMovieList/homeScreen.png",
    order_index: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "KasirKu - Point Of Sale",
    description: "Sistem Point of Sale lengkap dengan autentikasi dan manajemen inventory real-time",
    tech: ["Next.js 15", "React 19", "TypeScript", "Supabase", "Tailwind CSS"],
    period: "Juni 2025 – Juli 2025",
    type: "Fullstack Web",
    link: "https://kasirku.vercel.app/",
    image_url: "/projects/KasirKu/dashboard.png",
    order_index: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "LaundryBiner",
    description: "Platform pemesanan laundry online dengan sistem tracking real-time dan dashboard user",
    tech: ["Next.js", "TypeScript", "Supabase Auth", "Google OAuth", "Tailwind CSS"],
    period: "Jan – Jun 2022",
    type: "Fullstack Web",
    link: "https://github.com/izzq8/laundrybiner",
    image_url: "/projects/LaundryBiner/landingPage.png",
    order_index: 3,
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// Helper function to get project details with additional links
export const getProjectDetails = (projectId: string) => {
  const projectDetails = {
    "1": { // myMovieList
      githubUrl: "https://github.com/izzq8/MovieList",
      driveUrl: "https://drive.google.com/drive/folders/1ijhXOk5wg98XeXq5wytQxKWtj32o-xtM",
      liveUrl: null,
      downloadText: "Download APK"
    },
    "2": { // KasirKu
      githubUrl: "https://github.com/izzq8/KasirKu", 
      driveUrl: null,
      liveUrl: "https://kasirku.vercel.app/",
      downloadText: "Live Demo"
    },
    "3": { // LaundryBiner
      githubUrl: "https://github.com/izzq8/laundrybiner",
      driveUrl: null,
      liveUrl: null,
      downloadText: "Source Code Only"
    }
  }
  
  return projectDetails[projectId as keyof typeof projectDetails] || null
}

// Helper function to get project images for carousel
export const getProjectImages = (projectId: string) => {
  const projectImages = {
    "1": [ // myMovieList
      {
        url: "/projects/myMovieList/homeScreen.png",
        title: "Home Screen",
        description: "Main dashboard with popular movies"
      },
      {
        url: "/projects/myMovieList/movieDetail.png",
        title: "Movie Detail",
        description: "Detailed information about movies"
      },
      {
        url: "/projects/myMovieList/search.png",
        title: "Search Feature",
        description: "Search movies by title or genre"
      },
      {
        url: "/projects/myMovieList/watchList.png",
        title: "Watchlist",
        description: "Personal movie watchlist"
      },
      {
        url: "/projects/myMovieList/profile.png",
        title: "User Profile",
        description: "User profile and settings"
      }
    ],
    "2": [ // KasirKu
      {
        url: "/projects/KasirKu/dashboard.png",
        title: "Dashboard",
        description: "Main dashboard with sales overview"
      },
      {
        url: "/projects/KasirKu/transaksi.png",
        title: "Transaction",
        description: "Point of sale transaction interface"
      },
      {
        url: "/projects/KasirKu/produk.png",
        title: "Product Management",
        description: "Product inventory management"
      },
      {
        url: "/projects/KasirKu/laporan.png",
        title: "Reports",
        description: "Sales reports and analytics"
      },
      {
        url: "/projects/KasirKu/loginPage.png",
        title: "Login Page",
        description: "User authentication interface"
      }
    ],
    "3": [ // LaundryBiner
      {
        url: "/projects/LaundryBiner/landingPage.png",
        title: "Landing Page",
        description: "Main landing page with services"
      },
      {
        url: "/projects/LaundryBiner/dashboard.png",
        title: "User Dashboard",
        description: "User dashboard for order management"
      },
      {
        url: "/projects/LaundryBiner/createOrder.png",
        title: "Create Order",
        description: "Order creation interface"
      },
      {
        url: "/projects/LaundryBiner/order.png",
        title: "Order Management",
        description: "Track and manage orders"
      },
      {
        url: "/projects/LaundryBiner/profil.png",
        title: "User Profile",
        description: "User profile and preferences"
      }
    ]
  }
  
  return projectImages[projectId as keyof typeof projectImages] || []
}

const mockExperiences: Experience[] = [
  {
    id: "1",
    title: "IT Support Intern",
    company: "PPKPI Pasar Rebo",
    description:
      "Pengalaman magang sebagai IT Support di PPKPI Pasar Rebo, dimana saya mendapatkan pengalaman praktis dalam menangani masalah teknis, maintenance sistem, dan memberikan dukungan teknis kepada pengguna.",
    tags: ["Technical Support", "System Maintenance", "User Support"],
    order_index: 1,
    is_current: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "BNSP Certified Junior Web Developer",
    company: "Sertifikasi Resmi",
    description:
      "Memiliki sertifikasi resmi sebagai Junior Web Developer dari Badan Nasional Sertifikasi Profesi (BNSP), yang memvalidasi kemampuan dalam pengembangan aplikasi web sesuai standar industri.",
    tags: ["Web Development", "Industry Standard", "Professional Certification"],
    order_index: 2,
    is_current: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockSkills: Skill[] = [
  // Frontend
  {
    id: "1",
    name: "HTML",
    category: "Frontend",
    level: 5,
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "CSS",
    category: "Frontend",
    level: 5,
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "JavaScript",
    category: "Frontend",
    level: 4,
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "React.js",
    category: "Frontend",
    level: 4,
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Next.js",
    category: "Frontend",
    level: 4,
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "TypeScript",
    category: "Frontend",
    level: 4,
    order_index: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Tailwind CSS",
    category: "Frontend",
    level: 4,
    order_index: 7,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Backend
  {
    id: "8",
    name: "Express.js",
    category: "Backend",
    level: 3,
    order_index: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "RESTful API",
    category: "Backend",
    level: 4,
    order_index: 9,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Node.js",
    category: "Backend",
    level: 3,
    order_index: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "11",
    name: "JWT Auth",
    category: "Backend",
    level: 3,
    order_index: 11,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Database
  {
    id: "12",
    name: "Supabase",
    category: "Database",
    level: 4,
    order_index: 12,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "13",
    name: "Firebase",
    category: "Database",
    level: 4,
    order_index: 13,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "14",
    name: "PostgreSQL",
    category: "Database",
    level: 3,
    order_index: 14,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Firestore",
    category: "Database",
    level: 4,
    order_index: 15,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  // Tools & Design
  {
    id: "16",
    name: "GitHub",
    category: "Tools & Design",
    level: 4,
    order_index: 16,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "17",
    name: "VS Code",
    category: "Tools & Design",
    level: 5,
    order_index: 17,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "18",
    name: "Postman",
    category: "Tools & Design",
    level: 4,
    order_index: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "19",
    name: "Figma",
    category: "Tools & Design",
    level: 3,
    order_index: 19,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "20",
    name: "Vercel",
    category: "Tools & Design",
    level: 4,
    order_index: 20,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "21",
    name: "Photoshop",
    category: "Tools & Design",
    level: 4,
    order_index: 21,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "22",
    name: "Lightroom",
    category: "Tools & Design",
    level: 4,
    order_index: 22,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockLanguages: Language[] = [
  {
    id: "1",
    name: "Bahasa Indonesia",
    level: "Native",
    progress: 100,
    flag_emoji: "🇮🇩",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "English",
    level: "Professional Working",
    progress: 75,
    flag_emoji: "🇺🇸",
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const mockSoftSkills: SoftSkill[] = [
  {
    id: "1",
    name: "Problem Solving",
    icon: "🧩",
    color: "blue",
    order_index: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Teamwork",
    icon: "🤝",
    color: "green",
    order_index: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Communication",
    icon: "💬",
    color: "purple",
    order_index: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Attention to Detail",
    icon: "🔍",
    color: "orange",
    order_index: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Analytical Thinking",
    icon: "📊",
    color: "red",
    order_index: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Technical Writing",
    icon: "✍️",
    color: "indigo",
    order_index: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

// API Functions - Sementara menggunakan mock data untuk menghindari fetch errors
// Setelah Supabase dikonfigurasi dengan benar, fungsi-fungsi ini bisa diubah untuk menggunakan database

export const getPersonalInfo = async (): Promise<PersonalInfo | null> => {
  console.log("Using mock personal info data (Supabase disabled temporarily)")
  // Simulasi delay untuk meniru API call
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockPersonalInfo
}

export const getProjects = async (): Promise<Project[]> => {
  console.log("Using mock projects data (Supabase disabled temporarily)")
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockProjects
}

export const getExperiences = async (): Promise<Experience[]> => {
  console.log("Using mock experiences data (Supabase disabled temporarily)")
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockExperiences
}

export const getSkills = async (): Promise<Skill[]> => {
  console.log("Using mock skills data (Supabase disabled temporarily)")
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockSkills
}

export const getLanguages = async (): Promise<Language[]> => {
  console.log("Using mock languages data (Supabase disabled temporarily)")
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockLanguages
}

export const getSoftSkills = async (): Promise<SoftSkill[]> => {
  console.log("Using mock soft skills data (Supabase disabled temporarily)")
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockSoftSkills
}

export const getSkillsByCategory = async (): Promise<Record<string, Skill[]>> => {
  const skills = await getSkills()

  return skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )
}
