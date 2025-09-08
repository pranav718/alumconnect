// Update app/map/page.tsx to include filters
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import dynamic from 'next/dynamic'
import { Search } from 'lucide-react'

const MapComponent = dynamic(() => import('@/components/AlumniMap'), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Loading map...</div>
})

export default function AlumniMapPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [filteredAlumni, setFilteredAlumni] = useState<Alumni[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBatch, setSelectedBatch] = useState('')
  
  useEffect(() => {
    fetchAlumni()
  }, [])
  
  useEffect(() => {
    let filtered = alumni
    
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.company?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    if (selectedBatch) {
      filtered = filtered.filter(a => a.batch === parseInt(selectedBatch))
    }
    
    setFilteredAlumni(filtered)
  }, [searchTerm, selectedBatch, alumni])

  const fetchAlumni = async () => {
    const { data } = await supabase
      .from('alumni')
      .select('*')
      .not('location', 'is', null)
    
    if (data) {
      setAlumni(data)
      setFilteredAlumni(data)
    }
  }

  const uniqueBatches = [...new Set(alumni.map(a => a.batch))].sort()

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white shadow-md p-4 z-10">
        <div className="max-w-7xl mx-auto flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Batches</option>
            {uniqueBatches.map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
          <div className="text-sm text-gray-600 flex items-center">
            Showing {filteredAlumni.length} of {alumni.length} alumni
          </div>
        </div>
      </div>
      <div className="flex-1">
        <MapComponent alumni={filteredAlumni} />
      </div>
    </div>
  )
}