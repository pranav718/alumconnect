'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

const MapComponent = dynamic(() => import('@/components/AlumniMap'), {
  ssr: false,
  loading: () => <div className="h-screen flex items-center justify-center">Loading map...</div>
})

export default function AlumniMapPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    const { data, error } = await supabase
      .from('alumni')
      .select('*')
      .not('location', 'is', null)
    
    if (data) {
      setAlumni(data)
    }
    setLoading(false)
  }

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading alumni data...</div>
  }

  return (
    <div className="h-screen">
      <MapComponent alumni={alumni} />
    </div>
  )
}