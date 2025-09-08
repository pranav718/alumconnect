'use server';

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function signIn(formData: FormData) {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const supabase = createServerActionClient({ cookies });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Sign in error:', error);
    // Redirect back to the login page with an error message
    return redirect('/login?message=Could not authenticate user');
  }

  // On success, redirect to the main directory
  return redirect('/directory');
}

export async function signOut() {
  const supabase = createServerActionClient({ cookies });
  await supabase.auth.signOut();
  return redirect('/login');
}