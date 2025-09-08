'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Alumni } from '@/types/database'
import L from 'leaflet'
import { useEffect, useState } from 'react'

delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const cityCoordinates: Record<string, [number, number]> = {
  'Bangalore': [12.9716, 77.5946],
  'Mumbai': [19.0760, 72.8777],
  'Delhi': [28.6139, 77.2090],
  'Hyderabad': [17.3850, 78.4867],
  'Chennai': [13.0827, 80.2707],
  'Pune': [18.5204, 73.8567],
  'Kolkata': [22.5726, 88.3639],
  'Gurgaon': [28.4595, 77.0266],
  'Noida': [28.5355, 77.3910],
  'Jamnagar': [22.4707, 70.0577],
}

interface AlumniMapProps {
  alumni: Alumni[]
}

export default function AlumniMap({ alumni }: AlumniMapProps) {
  const [groupedAlumni, setGroupedAlumni] = useState<Record<string, Alumni[]>>({})

  useEffect(() => {
    const grouped = alumni.reduce((acc, person) => {
      if (person.location) {
        if (!acc[person.location]) {
          acc[person.location] = []
        }
        acc[person.location].push(person)
      }
      return acc
    }, {} as Record<string, Alumni[]>)
    
    setGroupedAlumni(grouped)
  }, [alumni])

  return (
    <MapContainer 
      center={[20.5937, 78.9629]} 
      zoom={5}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {Object.entries(groupedAlumni).map(([location, alumniList]) => {
        const coordinates = cityCoordinates[location]
        if (!coordinates) return null
        
        return (
          <Marker key={location} position={coordinates}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg mb-2">{location}</h3>
                <p className="text-sm text-gray-600 mb-2">{alumniList.length} alumni</p>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {alumniList.map((person) => (
                    <div key={person.id} className="border-b pb-2">
                      <p className="font-medium">{person.name}</p>
                      <p className="text-sm text-gray-600">
                        {person.job_title} at {person.company}
                      </p>
                      <p className="text-xs text-gray-500">Batch {person.batch}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}