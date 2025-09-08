// src/app/components/EnhancedFilterBar.tsx
'use client'

import { Search, X, Filter, ChevronDown } from "lucide-react"
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface FilterBarProps {
  companies?: string[]
  locations?: string[]
  degrees?: string[]
  batches?: number[]
}

export function EnhancedFilterBar({ companies = [], locations = [], degrees = [], batches = [] }: FilterBarProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const params = new URLSearchParams()

    // Add all form values to params
    formData.forEach((value, key) => {
      if (value && value !== 'all') {
        params.append(key, value.toString())
      }
    })

    router.push(`/directory?${params.toString()}`)
  }

  const handleClear = () => {
    router.push('/directory')
  }

  const activeFiltersCount = Array.from(searchParams?.entries() || []).length

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      {/* Main Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            name="search"
            defaultValue={searchParams?.get('search') || ''}
            placeholder="Search by name, company, job title, or location..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="px-4 py-3 border rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
          
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
          
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="bg-gray-200 text-gray-700 font-semibold px-4 py-3 rounded-lg hover:bg-gray-300 transition flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Year
            </label>
            <select
              name="batch"
              defaultValue={searchParams?.get('batch') || 'all'}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Batches</option>
              {batches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <select
              name="company"
              defaultValue={searchParams?.get('company') || 'all'}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              name="location"
              defaultValue={searchParams?.get('location') || 'all'}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree
            </label>
            <select
              name="degree"
              defaultValue={searchParams?.get('degree') || 'all'}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">All Degrees</option>
              {degrees.map(degree => (
                <option key={degree} value={degree}>{degree}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </form>
  )
}