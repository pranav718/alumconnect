// app/page.tsx
import { getHomepageStats } from '@/lib/data'
import Link from 'next/link'
import { Users, Building2, MapPin, ArrowRight } from 'lucide-react'

export default async function HomePage() {
  const stats = await getHomepageStats()
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to AlumConnect
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with alumni, explore career paths, and build your professional network
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/directory"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              Explore Directory <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/map"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 flex items-center gap-2"
            >
              View Global Map
            </Link>
          </div>
        </div>

      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalAlumni}</h3>
            <p className="text-gray-600 mt-2">Alumni in Network</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Building2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalCompanies}</h3>
            <p className="text-gray-600 mt-2">Companies Represented</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <MapPin className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900">{stats.totalLocations}</h3>
            <p className="text-gray-600 mt-2">Global Locations</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Alumni Directory', desc: 'Search and filter alumni by batch, company, or location', link: '/directory' },
            { title: 'Interactive Map', desc: 'Visualize where alumni are located globally', link: '/map' },
            { title: 'Career Timeline', desc: 'Track career progression and company trends', link: '/timeline' },
            { title: 'Data Export', desc: 'Export alumni data for analysis and reporting', link: '/export' }
          ].map((feature) => (
            <Link
              key={feature.title}
              href={feature.link}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}