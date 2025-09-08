// src/app/components/AdminDashboardClient.tsx
'use client'

import { Users, Building2, MapPin, Plus, UserPlus } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useState } from 'react'
import AddAlumniForm from './AddAlumniForm'

interface DashboardStats {
  totalAlumni: number
  uniqueCompanies: number
  uniqueLocations: number
  batchData: { batch: string; count: number }[]
  locationData: { location: string; count: number }[]
  recentAlumni: {
    id: string
    name: string
    batch: number
    company: string | null
    location: string | null
  }[]
}

interface AdminDashboardClientProps {
  stats: DashboardStats
}

export default function AdminDashboardClient({ stats }: AdminDashboardClientProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Add New Alumni
            </button>
          </div>

          {/* Stats Cards */}
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

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex flex-col items-center gap-2"
              >
                <UserPlus className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium">Add Alumni</span>
              </button>
              <a
                href="/export"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition flex flex-col items-center gap-2"
              >
                <Plus className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium">Export Data</span>
              </a>
              <a
                href="/directory"
                className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition flex flex-col items-center gap-2"
              >
                <Users className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium">View Directory</span>
              </a>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Batch Distribution */}
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

            {/* Location Distribution */}
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

          {/* Recent Alumni */}
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
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentAlumni.map((alumni) => (
                    <tr key={alumni.id} className="border-b hover:bg-gray-50">
                      <td className="py-2">{alumni.name}</td>
                      <td className="py-2">{alumni.batch}</td>
                      <td className="py-2">{alumni.company || '-'}</td>
                      <td className="py-2">{alumni.location || '-'}</td>
                      <td className="py-2">
                        <a
                          href={`/alumni/${alumni.id}`}
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View Profile
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add Alumni Form Modal */}
      {showAddForm && (
        <AddAlumniForm onClose={() => setShowAddForm(false)} />
      )}
    </>
  )
}