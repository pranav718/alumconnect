import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import AdminDashboardClient from '@/components/AdminDashboardClient'

async function getAlumniStats() {
  const { data: alumni, error } = await supabase
    .from('alumni')
    .select('*')
  
  if (error || !alumni) return null

  // Calculate stats
  const totalAlumni = alumni.length
  const uniqueCompanies = new Set(alumni.map(a => a.company).filter(Boolean)).size
  const uniqueLocations = new Set(alumni.map(a => a.location).filter(Boolean)).size
  
  // Batch distribution
  const batchCounts = alumni.reduce((acc, curr) => {
    acc[curr.batch] = (acc[curr.batch] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  const batchData = Object.entries(batchCounts).map(([batch, count]) => ({
    batch: `Batch ${batch}`,
    count: count as number  // Explicit type assertion
  }))

  // Location distribution
  const locationCounts = alumni.reduce((acc, curr) => {
    if (curr.location) {
      acc[curr.location] = (acc[curr.location] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
    const locationData = (Object.entries(locationCounts) as [string, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([location, count]) => ({
        location,
        count
    }))

  return {
    totalAlumni,
    uniqueCompanies,
    uniqueLocations,
    batchData,
    locationData,
    recentAlumni: alumni.slice(0, 5).map(a => ({
      id: a.id,
      name: a.name,
      batch: a.batch,
      company: a.company,
      location: a.location
    }))
  }
}

export default async function AdminDashboard() {
  const stats = await getAlumniStats()
  
  if (!stats) {
    return <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="text-red-600">Error loading dashboard</div>
    </div>
  }

  return <AdminDashboardClient stats={stats} />
}