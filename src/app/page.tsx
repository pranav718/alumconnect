import Link from 'next/link'
import { Users, Building2, MapPin, ArrowRight, Globe, TrendingUp, Briefcase, GraduationCap, Network } from 'lucide-react'
import { getHomepageStats } from '@/lib/data'

export default async function HomePage() {
  const stats = await getHomepageStats()
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Connect. Network. Grow.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Join our thriving alumni community and unlock opportunities across the globe
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/directory"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
              >
                Explore Alumni Directory <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/map"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition flex items-center justify-center gap-2"
              >
                <Globe className="w-5 h-5" /> View Global Network
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition">
              <Users className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.totalAlumni}+</h3>
              <p className="text-gray-600">Active Alumni</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition">
              <Building2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.totalCompanies}+</h3>
              <p className="text-gray-600">Companies Represented</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition">
              <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{stats.totalLocations}+</h3>
              <p className="text-gray-600">Global Locations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Alumni Success</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay connected and grow your professional network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/directory" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition h-full">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Alumni Directory</h3>
                <p className="text-gray-600">Search and connect with alumni by batch, company, location, or expertise.</p>
              </div>
            </Link>

            <Link href="/map" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition h-full">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition">
                  <Globe className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Map</h3>
                <p className="text-gray-600">Visualize our global alumni network and discover connections near you.</p>
              </div>
            </Link>

            <Link href="/timeline" className="group">
              <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition h-full">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Career Timeline</h3>
                <p className="text-gray-600">Track career progressions and explore industry trends across batches.</p>
              </div>
            </Link>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Job Opportunities</h3>
              <p className="text-gray-600">Access exclusive job postings and referrals from fellow alumni.</p>
              <span className="text-sm text-orange-600 font-medium">Coming Soon</span>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mentorship Program</h3>
              <p className="text-gray-600">Connect with experienced alumni for career guidance and mentorship.</p>
              <span className="text-sm text-indigo-600 font-medium">Coming Soon</span>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Network className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Events & Reunions</h3>
              <p className="text-gray-600">Stay updated on alumni events, reunions, and networking opportunities.</p>
              <span className="text-sm text-pink-600 font-medium">Coming Soon</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Connect with Your Alumni Network?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of alumni who are already benefiting from our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Now
            </Link>
            <Link
              href="/directory"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Browse Alumni
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">AlumConnect</h3>
              <p className="text-sm">Connecting alumni worldwide for professional growth and opportunities.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/directory" className="hover:text-white transition">Alumni Directory</Link></li>
                <li><Link href="/map" className="hover:text-white transition">Global Map</Link></li>
                <li><Link href="/timeline" className="hover:text-white transition">Career Timeline</Link></li>
                <li><Link href="/export" className="hover:text-white transition">Export Data</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
              <p className="text-sm mb-4">Get updates on alumni events and opportunities</p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2024 AlumConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}