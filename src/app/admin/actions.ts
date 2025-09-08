// src/app/admin/actions.ts
'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function addAlumni(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      batch: parseInt(formData.get('batch') as string),
      degree: formData.get('degree') as string || null,
      job_title: formData.get('job_title') as string || null,
      company: formData.get('company') as string || null,
      location: formData.get('location') as string || null,
      bio: formData.get('bio') as string || null,
      linkedin_url: formData.get('linkedin_url') as string || null,
      created_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('alumni')
      .insert([data])

    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin')
    revalidatePath('/directory')
    
    return { success: true }
  } catch (error) {
    console.error('Server error:', error)
    return { success: false, error: 'Failed to add alumni' }
  }
}