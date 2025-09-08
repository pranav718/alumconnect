import { supabase } from '@/lib/supabase'
import { FilterBar } from '@/components/FilterBar'
import { AlumniCard } from '@/components/AlumniCard'
import Link from 'next/link'

async function getFilteredAlumni(searchParams: any) {
  let query = supabase.from('alumni').select('*')
  
  if (searchParams?.search) {
    query = query.or(`name.ilike.%${searchParams.search}%,company.ilike.%${searchParams.search}%,location.ilike.%${searchParams.search}%`)
  }
  
  if (searchParams?.batch) {
    query = query.eq('batch', searchParams.batch)
  }
  
  const { data, error } = await query.order('name')
  return { alumni: data || [], error }
}

export default async function DirectoryPage({ searchParams }: { searchParams: any }) {
  const { alumni, error } = await getFilteredAlumni(searchParams)
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>
        <FilterBar />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {alumni.map((person) => (
            <Link key={person.id} href={`/alumni/${person.id}`}>
              <AlumniCard alumnus={person} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}