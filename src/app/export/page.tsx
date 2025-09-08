'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import { Download, Check } from 'lucide-react'

export default function ExportPage() {
  const [selectedFields, setSelectedFields] = useState({
    name: true,
    email: true,
    batch: true,
    degree: true,
    job_title: true,
    company: true,
    location: true,
    bio: false,
    linkedin_url: false,
  })
  const [loading, setLoading] = useState(false)

  const handleFieldToggle = (field: keyof typeof selectedFields) => {
    setSelectedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const exportToCSV = async () => {
    setLoading(true)
    
    try {
      const { data: alumni, error } = await supabase
        .from('alumni')
        .select('*')
        .order('batch', { ascending: false })
      
      if (error) throw error
      
      const headers = Object.entries(selectedFields)
        .filter(([_, selected]) => selected)
        .map(([field, _]) => field.replace(/_/g, ' ').toUpperCase())
      
      const rows = alumni?.map(alumnus => {
        return Object.entries(selectedFields)
          .filter(([_, selected]) => selected)
          .map(([field, _]) => {
            const value = alumnus[field as keyof Alumni]
        
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value || ''
          })
          .join(',')
      }) || []
      
      const csvContent = [headers.join(','), ...rows].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      
      link.setAttribute('href', url)
      link.setAttribute('download', `alumni_export_${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
    } catch (error) {
      console.error('Export failed:', error)
      alert('Failed to export data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Export Alumni Data</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Select Fields to Export</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(selectedFields).map(([field, selected]) => (
              <label key={field} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => handleFieldToggle(field as keyof typeof selectedFields)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">
                  {field.replace(/_/g, ' ').charAt(0).toUpperCase() + field.replace(/_/g, ' ').slice(1)}
                </span>
              </label>
            ))}
          </div>
          
          <div className="border-t pt-4">
            <button
              onClick={exportToCSV}
              disabled={loading || !Object.values(selectedFields).some(v => v)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export to CSV
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Export Information</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5" />
              <span>Data will be exported in CSV format compatible with Excel and Google Sheets</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5" />
              <span>Alumni are sorted by batch year (newest first)</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 mt-0.5" />
              <span>Select at least one field to enable export</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}