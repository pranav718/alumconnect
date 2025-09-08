// /app/login/actions.ts (simplified for demo)
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signIn(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  // Mock authentication for demo
  if (email === 'admin@alumconnect.com' && password === 'admin123') {
    const cookieStore = await cookies()
    cookieStore.set('user-role', 'admin')
    cookieStore.set('user-email', email)
    redirect('/admin')
  } else if (email === 'user@alumconnect.com' && password === 'user123') {
    const cookieStore = await cookies()
    cookieStore.set('user-role', 'user')
    cookieStore.set('user-email', email)
    redirect('/directory')
  } else {
    redirect('/login?message=Invalid credentials')
  }
}

export async function signOut() {
  const cookieStore = await cookies()
  cookieStore.delete('user-role')
  cookieStore.delete('user-email')
  redirect('/login')
}