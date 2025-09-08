// src/app/components/AISearchBar.tsx
'use client'

import { useState } from 'react'
import { Search, Sparkles, Loader2, X } from 'lucide-react'
import { Alumni } from '@/types/database'
import { AlumniCard } from './AlumniCard'
import Link from 'next/link'

export default function AISearchBar() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Alumni[]>([])
  const [showResults, setShowResults] = useState(false)
  const [searchMode, setSearchMode] = useState<'normal' | 'ai'>('normal')

  const handleAISearch = async () => {
    if (!query.trim()) return
    
    setLoading(true)
    setShowResults(true)
    
    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) throw new Error('Search failed')
      
      const data = await response.json()
      setResults(data.alumni || [])
    } catch (error) {
      console.error('AI Search error:', error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchMode === 'ai') {
      handleAISearch()
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Search Mode Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSearchMode('normal')}
            className={`px-4 py-2 rounded-lg transition ${
              searchMode === 'normal'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Normal Search
          </button>
          <button
            onClick={() => setSearchMode('ai')}
            className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
              searchMode === 'ai'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Search
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {searchMode === 'ai' ? (
              <Sparkles className="w-5 h-5 text-purple-500" />
            ) : (
              <Search className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              searchMode === 'ai'
                ? "Try: 'Show me alumni working at Microsoft from batch 2020' or 'Find software engineers in Bangalore'"
                : "Search by name, company, or location..."
            }
            className="w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('')
                setShowResults(false)
                setResults([])
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* Search Button for AI Mode */}
        {searchMode === 'ai' && (
          <button
            onClick={handleAISearch}
            disabled={loading || !query.trim()}
            className="mt-4 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                AI is thinking...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Search with AI
              </>
            )}
          </button>
        )}

        {/* Example Queries */}
        {searchMode === 'ai' && !showResults && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm font-medium text-purple-900 mb-2">Try these example queries:</p>
            <div className="space-y-1">
              <button
                onClick={() => setQuery("Find alumni working at Google or Microsoft")}
                className="text-sm text-purple-700 hover:text-purple-900 block text-left"
              >
                • "Find alumni working at Google or Microsoft"
              </button>
              <button
                onClick={() => setQuery("Show me software engineers from batch 2020 in Bangalore")}
                className="text-sm text-purple-700 hover:text-purple-900 block text-left"
              >
                • "Show me software engineers from batch 2020 in Bangalore"
              </button>
              <button
                onClick={() => setQuery("Who are the alumni in product management roles?")}
                className="text-sm text-purple-700 hover:text-purple-900 block text-left"
              >
                • "Who are the alumni in product management roles?"
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {showResults && (
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">
              {loading ? 'Searching...' : `Found ${results.length} alumni`}
            </h3>
            <button
              onClick={() => {
                setShowResults(false)
                setResults([])
              }}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Close results
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((alumni) => (
                <Link key={alumni.id} href={`/alumni/${alumni.id}`}>
                  <AlumniCard alumnus={alumni} />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              No alumni found matching your query. Try rephrasing your search.
            </p>
          )}
        </div>
      )}
    </div>
  )
}