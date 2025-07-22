import { supabase } from "./supabase"
import type { PersonalInfo, Project, Experience, Skill, Language, SoftSkill } from "./supabase"

// Personal Info CRUD
export const updatePersonalInfo = async (data: Partial<PersonalInfo>): Promise<PersonalInfo | null> => {
  try {
    const { data: result, error } = await supabase
      .from("personal_info")
      .update({ ...data, updated_at: new Date().toISOString() })
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error updating personal info:", error)
    return null
  }
}

// Projects CRUD
export const createProject = async (
  data: Omit<Project, "id" | "created_at" | "updated_at">,
): Promise<Project | null> => {
  try {
    const { data: result, error } = await supabase
      .from("projects")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error creating project:", error)
    return null
  }
}

export const updateProject = async (id: string, data: Partial<Project>): Promise<Project | null> => {
  try {
    const { data: result, error } = await supabase
      .from("projects")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error updating project:", error)
    return null
  }
}

export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting project:", error)
    return false
  }
}

// Experiences CRUD
export const createExperience = async (
  data: Omit<Experience, "id" | "created_at" | "updated_at">,
): Promise<Experience | null> => {
  try {
    const { data: result, error } = await supabase
      .from("experiences")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error creating experience:", error)
    return null
  }
}

export const updateExperience = async (id: string, data: Partial<Experience>): Promise<Experience | null> => {
  try {
    const { data: result, error } = await supabase
      .from("experiences")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error updating experience:", error)
    return null
  }
}

export const deleteExperience = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("experiences").delete().eq("id", id)
    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting experience:", error)
    return false
  }
}

// Skills CRUD
export const createSkill = async (data: Omit<Skill, "id" | "created_at" | "updated_at">): Promise<Skill | null> => {
  try {
    const { data: result, error } = await supabase
      .from("skills")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error creating skill:", error)
    return null
  }
}

export const updateSkill = async (id: string, data: Partial<Skill>): Promise<Skill | null> => {
  try {
    const { data: result, error } = await supabase
      .from("skills")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error updating skill:", error)
    return null
  }
}

export const deleteSkill = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("skills").delete().eq("id", id)
    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting skill:", error)
    return false
  }
}

// Languages CRUD
export const createLanguage = async (
  data: Omit<Language, "id" | "created_at" | "updated_at">,
): Promise<Language | null> => {
  try {
    const { data: result, error } = await supabase
      .from("languages")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error creating language:", error)
    return null
  }
}

export const updateLanguage = async (id: string, data: Partial<Language>): Promise<Language | null> => {
  try {
    const { data: result, error } = await supabase
      .from("languages")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error updating language:", error)
    return null
  }
}

export const deleteLanguage = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("languages").delete().eq("id", id)
    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting language:", error)
    return false
  }
}

// Soft Skills CRUD
export const createSoftSkill = async (
  data: Omit<SoftSkill, "id" | "created_at" | "updated_at">,
): Promise<SoftSkill | null> => {
  try {
    const { data: result, error } = await supabase
      .from("soft_skills")
      .insert({
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error creating soft skill:", error)
    return null
  }
}

export const updateSoftSkill = async (id: string, data: Partial<SoftSkill>): Promise<SoftSkill | null> => {
  try {
    const { data: result, error } = await supabase
      .from("soft_skills")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return result
  } catch (error) {
    console.error("Error updating soft skill:", error)
    return null
  }
}

export const deleteSoftSkill = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from("soft_skills").delete().eq("id", id)
    if (error) throw error
    return true
  } catch (error) {
    console.error("Error deleting soft skill:", error)
    return false
  }
}
