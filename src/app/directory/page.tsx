// src/app/directory/page.tsx
import { supabase } from '@/lib/supabase'
import { EnhancedFilterBar } from '@/components/EnhancedFilterBar'
import { AlumniCard } from '@/components/AlumniCard'
import Link from 'next/link'

async function getFilterOptions() {
  const { data: alumni } = await supabase
    .from('alumni')
    .select('company, location, degree, batch')

  if (!alumni) return { companies: [], locations: [], degrees: [], batches: [] }

  const companies = [...new Set(alumni.map(a => a.company).filter(Boolean))] as string[]
  const locations = [...new Set(alumni.map(a => a.location).filter(Boolean))] as string[]
  const degrees = [...new Set(alumni.map(a => a.degree).filter(Boolean))] as string[]
  const batches = [...new Set(alumni.map(a => a.batch).filter(Boolean))].sort((a, b) => b - a) as number[]

  return { companies, locations, degrees, batches }
}

async function getFilteredAlumni(searchParams: any) {
  let query = supabase.from('alumni').select('*')
  
  if (searchParams?.search) {
    query = query.or(`name.ilike.%${searchParams.search}%,company.ilike.%${searchParams.search}%,location.ilike.%${searchParams.search}%,job_title.ilike.%${searchParams.search}%`)
  }
  
  if (searchParams?.batch) {
    query = query.eq('batch', searchParams.batch)
  }
  
  if (searchParams?.company) {
    query = query.eq('company', searchParams.company)
  }
  
  if (searchParams?.location) {
    query = query.eq('location', searchParams.location)
  }
  
  if (searchParams?.degree) {
    query = query.eq('degree', searchParams.degree)
  }
  
  const { data, error } = await query.order('name')
  return { alumni: data || [], error }
}

export default async function DirectoryPage({ searchParams }: { searchParams: any }) {
  const [{ alumni, error }, filterOptions] = await Promise.all([
    getFilteredAlumni(searchParams),
    getFilterOptions()
  ])
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Alumni Directory</h1>
          <div className="text-sm text-gray-600">
            {alumni.length} alumni found
          </div>
        </div>
        
        <EnhancedFilterBar {...filterOptions} />
        
        {alumni.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No alumni found matching your criteria.</p>
            <button
              onClick={() => window.location.href = '/directory'}
              className="mt-4 text-blue-600 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {alumni.map((person) => (
              <Link key={person.id} href={`/alumni/${person.id}`}>
                <AlumniCard alumnus={person} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}