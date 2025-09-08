import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import { Building2, Calendar, TrendingUp } from 'lucide-react'

async function getCareerStats() {
  const { data: alumni, error } = await supabase
    .from('alumni')
    .select('*')
    .order('batch', { ascending: true })
  
  if (error || !alumni) return null

  // Group by company
  const companyGroups = alumni.reduce((acc, person) => {
    if (person.company) {
      if (!acc[person.company]) {
        acc[person.company] = []
      }
      acc[person.company].push(person)
    }
    return acc
  }, {} as Record<string, Alumni[]>)

  // Calculate average years since graduation
  const currentYear = new Date().getFullYear()
  const avgYearsSinceGrad = alumni.reduce((sum, person) => {
    return sum + (currentYear - person.batch)
  }, 0) / alumni.length

  return {
    alumni,
    companyGroups,
    avgYearsSinceGrad: Math.round(avgYearsSinceGrad * 10) / 10,
    totalCompanies: Object.keys(companyGroups).length
  }
}

export default async function CareerTimeline() {
  const stats = await getCareerStats()
  
  if (!stats) {
    return <div>Error loading timeline</div>
  }

  // Get top companies by alumni count with proper typing
  const topCompanies = (Object.entries(stats.companyGroups) as [string, Alumni[]][])
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Career Timeline & Analytics</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-500 text-sm">Avg Years Since Graduation</p>
                <p className="text-2xl font-bold">{stats.avgYearsSinceGrad} years</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-500 text-sm">Total Companies</p>
                <p className="text-2xl font-bold">{stats.totalCompanies}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-gray-500 text-sm">Alumni Tracked</p>
                <p className="text-2xl font-bold">{stats.alumni.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline by Batch */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Alumni Journey by Batch</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            
            {/* Group alumni by batch with proper typing */}
            {(Object.entries(
              stats.alumni.reduce((acc, person) => {
                if (!acc[person.batch]) acc[person.batch] = []
                acc[person.batch].push(person)
                return acc
              }, {} as Record<number, Alumni[]>)
            ) as [string, Alumni[]][])
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([batch, batchAlumni]) => (
                <div key={batch} className="relative flex items-start mb-8">
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className="ml-16">
                    <h3 className="text-lg font-semibold mb-2">Batch {batch}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {batchAlumni.slice(0, 6).map((person) => (
                        <div key={person.id} className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium text-sm">{person.name}</p>
                          <p className="text-xs text-gray-600">
                            {person.job_title} at {person.company}
                          </p>
                        </div>
                      ))}
                      {batchAlumni.length > 6 && (
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-center">
                          <p className="text-sm text-gray-600">
                            +{batchAlumni.length - 6} more alumni
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Top Companies by Alumni Count</h2>
          <div className="space-y-4">
            {topCompanies.map(([company, alumni], index) => (
              <div key={company} className="flex items-center gap-4">
                <div className="w-8 text-center font-bold text-gray-500">
                  #{index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium">{company}</h3>
                    <span className="text-sm text-gray-600">{alumni.length} alumni</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(alumni.length / stats.alumni.length) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-1 text-xs text-gray-500">
                    Batches: {[...new Set(alumni.map(a => a.batch))].sort().join(', ')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}