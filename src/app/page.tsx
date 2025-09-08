'use client'

import Link from 'next/link'
import { Users, Building2, MapPin, ArrowRight, Globe, TrendingUp, Briefcase, GraduationCap, Network } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleOnHover = {
  whileHover: { scale: 1.05 }
}

export default function HomePage() {
  const [stats, setStats] = useState({ totalAlumni: 0, totalCompanies: 0, totalLocations: 0 })
  
  useEffect(() => {
    // Fetch stats client-side or pass as props
    const fetchStats = async () => {
      // const data = await getHomepageStats()
      // setStats(data)
      // Mock data for now
      setStats({ totalAlumni: 5000, totalCompanies: 1200, totalLocations: 50 })
    }
    fetchStats()
  }, [])

  const features = [
    {
      href: "/directory",
      icon: Users,
      title: "Alumni Directory",
      description: "Search and connect with alumni by batch, company, location, or expertise.",
      color: "blue",
      available: true
    },
    {
      href: "/map",
      icon: Globe,
      title: "Interactive Map",
      description: "Visualize our global alumni network and discover connections near you.",
      color: "green",
      available: true
    },
    {
      href: "/timeline",
      icon: TrendingUp,
      title: "Career Timeline",
      description: "Track career progressions and explore industry trends across batches.",
      color: "purple",
      available: true
    },
    {
      href: "#",
      icon: Briefcase,
      title: "Job Opportunities",
      description: "Access exclusive job postings and referrals from fellow alumni.",
      color: "orange",
      available: false
    },
    {
      href: "#",
      icon: GraduationCap,
      title: "Mentorship Program",
      description: "Connect with experienced alumni for career guidance and mentorship.",
      color: "indigo",
      available: false
    },
    {
      href: "#",
      icon: Network,
      title: "Events & Reunions",
      description: "Stay updated on alumni events, reunions, and networking opportunities.",
      color: "pink",
      available: false
    }
  ]

  const statsData = [
    { icon: Users, value: stats.totalAlumni, label: "Active Alumni", color: "text-blue-600" },
    { icon: Building2, value: stats.totalCompanies, label: "Companies Represented", color: "text-green-600" },
    { icon: MapPin, value: stats.totalLocations, label: "Global Locations", color: "text-purple-600" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32"
        >
          <div className="text-center space-y-8">
            <motion.h1 
              {...fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              Connect. Network. Grow.
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto px-4"
            >
              Join our thriving alumni community and unlock opportunities across the globe
            </motion.p>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                <Link href="/directory" className="flex items-center gap-2">
                  Explore Alumni Directory <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white text-blue-600 hover:bg-white hover:text-blue-600">
                <Link href="/map" className="flex items-center gap-2">
                  <Globe className="w-5 h-5" /> View Global Network
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          >
            {statsData.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="pt-8 pb-8">
                    <motion.div {...scaleOnHover}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring" as const, stiffness: 300 }}
                      >
                        <stat.icon className={`w-12 h-12 sm:w-16 sm:h-16 ${stat.color} mx-auto mb-4`} />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">
                        {stat.value.toLocaleString()}+
                      </h3>
                      <p className="text-gray-600">{stat.label}</p>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Alumni Success
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to stay connected and grow your professional network
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                {feature.available ? (
                  <Link href={feature.href} className="block h-full">
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                          <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                        </div>
                        <CardTitle>{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="h-full relative overflow-hidden">
                    <CardHeader>
                      <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                        <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{feature.description}</CardDescription>
                      <Badge variant="secondary" className="mt-4">Coming Soon</Badge>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 sm:py-16 lg:py-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Connect with Your Alumni Network?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Join thousands of alumni who are already benefiting from our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/login">Get Started Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-white text-blue-600 hover:bg-white hover:text-blue-600">
              <Link href="/directory">Browse Alumni</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold text-lg mb-4">AlumConnect</h3>
              <p className="text-sm">Connecting alumni worldwide for professional growth and opportunities.</p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/directory" className="hover:text-white transition">Alumni Directory</Link></li>
                <li><Link href="/map" className="hover:text-white transition">Global Map</Link></li>
                <li><Link href="/timeline" className="hover:text-white transition">Career Timeline</Link></li>
                <li><Link href="/export" className="hover:text-white transition">Export Data</Link></li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
              <p className="text-sm mb-4">Get updates on alumni events and opportunities</p>
              <form className="flex gap-2 max-w-sm mx-auto sm:mx-0">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  Subscribe
                </Button>
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