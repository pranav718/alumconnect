import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import Link from 'next/link'
import { Building2, MapPin, Calendar } from 'lucide-react'

async function getAlumni() {
  const { data, error } = await supabase
    .from('alumni')
    .select('*')
    .order('batch', { ascending: false })
  
  if (error) return []
  return data || []
}

export default async function DirectoryPage() {
  const alumni = await getAlumni()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((person) => (
            <Link 
              key={person.id} 
              href={`/alumni/${person.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
              
              {person.job_title && person.company && (
                <p className="text-gray-600 mb-3">
                  {person.job_title} at {person.company}
                </p>
              )}
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Batch {person.batch}</span>
                </div>
                
                {person.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{person.location}</span>
                  </div>
                )}
                
                {person.company && (
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span>{person.company}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}