import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// This function can be called from any Server Component to get the current user
export async function getUser() {
  const supabase = createServerComponentClient({ cookies });
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}