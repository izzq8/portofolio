import { supabase } from "./supabase"
import type { PersonalInfo, Project, Experience, Skill, Language, SoftSkill } from "./supabase"

// File terpisah untuk fungsi Supabase yang akan digunakan setelah database dikonfigurasi
// Fungsi-fungsi ini siap digunakan untuk admin CRUD operations

export const getPersonalInfoFromDB = async (): Promise<PersonalInfo | null> => {
  try {
    const { data, error } = await supabase.from("personal_info").select("*").single()
    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching personal info:", error)
    return null
  }
}

export const getProjectsFromDB = async (): Promise<Project[]> => {
  try {
    const { data, error } = await supabase.from("projects").select("*").order("order_index", { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching projects:", error)
    return []
  }
}

export const getExperiencesFromDB = async (): Promise<Experience[]> => {
  try {
    const { data, error } = await supabase.from("experiences").select("*").order("order_index", { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching experiences:", error)
    return []
  }
}

export const getSkillsFromDB = async (): Promise<Skill[]> => {
  try {
    const { data, error } = await supabase.from("skills").select("*").order("order_index", { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching skills:", error)
    return []
  }
}

export const getLanguagesFromDB = async (): Promise<Language[]> => {
  try {
    const { data, error } = await supabase.from("languages").select("*").order("order_index", { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching languages:", error)
    return []
  }
}

export const getSoftSkillsFromDB = async (): Promise<SoftSkill[]> => {
  try {
    const { data, error } = await supabase.from("soft_skills").select("*").order("order_index", { ascending: true })
    if (error) throw error
    return data || []
  } catch (error) {
    console.error("Error fetching soft skills:", error)
    return []
  }
}
