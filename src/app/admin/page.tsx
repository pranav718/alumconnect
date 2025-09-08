import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import { Users, Building2, MapPin, TrendingUp } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

async function getAlumniStats() {
  const { data: alumni, error } = await supabase
    .from('alumni')
    .select('*')
  
  if (error || !alumni) return null

  const totalAlumni = alumni.length
  const uniqueCompanies = new Set(alumni.map(a => a.company).filter(Boolean)).size
  const uniqueLocations = new Set(alumni.map(a => a.location).filter(Boolean)).size
  
  const batchCounts = alumni.reduce((acc, curr) => {
    acc[curr.batch] = (acc[curr.batch] || 0) + 1
    return acc
  }, {} as Record<number, number>)
  
  const batchData = Object.entries(batchCounts).map(([batch, count]) => ({
    batch: `Batch ${batch}`,
    count
  }))

  const locationCounts = alumni.reduce((acc, curr) => {
    if (curr.location) {
      acc[curr.location] = (acc[curr.location] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)
  
    const locationData = Object.entries(locationCounts)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 5)
    .map(([location, count]) => ({
        location,
        count: count as number
    }))

  return {
    totalAlumni,
    uniqueCompanies,
    uniqueLocations,
    batchData,
    locationData,
    recentAlumni: alumni.slice(0, 5)
  }
}

export default async function AdminDashboard() {
  const stats = await getAlumniStats()
  
  if (!stats) {
    return <div>Error loading dashboard</div>
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Alumni</p>
                <p className="text-3xl font-bold">{stats.totalAlumni}</p>
              </div>
              <Users className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Companies</p>
                <p className="text-3xl font-bold">{stats.uniqueCompanies}</p>
              </div>
              <Building2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Locations</p>
                <p className="text-3xl font-bold">{stats.uniqueLocations}</p>
              </div>
              <MapPin className="w-12 h-12 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Alumni by Batch</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.batchData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="batch" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Top Locations</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.locationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ location, count }) => `${location}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {stats.locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Alumni</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Batch</th>
                  <th className="text-left py-2">Company</th>
                  <th className="text-left py-2">Location</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAlumni.map((alumni) => (
                  <tr key={alumni.id} className="border-b">
                    <td className="py-2">{alumni.name}</td>
                    <td className="py-2">{alumni.batch}</td>
                    <td className="py-2">{alumni.company || '-'}</td>
                    <td className="py-2">{alumni.location || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}