import { createClient } from "@supabase/supabase-js"

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create Supabase client only if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Add a flag to check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

// Types for database tables (keep existing types)
export interface PersonalInfo {
  id: string
  name: string
  title: string
  description: string
  email: string
  phone?: string
  github_url?: string
  linkedin_url?: string
  instagram_url?: string
  profile_image_url?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  description: string
  tech: string[]
  period: string
  type: string
  link?: string
  image_url?: string
  order_index: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Experience {
  id: string
  title: string
  company: string
  description: string
  tags: string[]
  start_date?: string
  end_date?: string
  is_current: boolean
  order_index: number
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  order_index: number
  created_at: string
  updated_at: string
}

export interface Language {
  id: string
  name: string
  level: string
  progress: number
  flag_emoji?: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface SoftSkill {
  id: string
  name: string
  icon?: string
  color: string
  order_index: number
  created_at: string
  updated_at: string
}
