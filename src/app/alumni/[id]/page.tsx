import { supabase } from '@/lib/supabase'
import { Alumni } from '@/types/database'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Building2, MapPin, GraduationCap, Calendar, Linkedin, Mail, MessageSquare } from 'lucide-react';

async function getAlumni(id: string): Promise<Alumni | null> {
    const {data, error} = await supabase
    .from("alumni")
    .select('*')
    .eq('id', id)
    .single()

    if (error) return null
    return data
}

export default async function AlumniProfile( {params}: {params: {id: string}}){
    const alumni = await getAlumni(params.id);
    if(!alumni){
        notFound();
    }

    return (
            <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{alumni.name}</h1>
              <p className="text-xl text-gray-600 mb-4">
                {alumni.job_title} at {alumni.company}
              </p>
              
              <div className="flex flex-wrap gap-4 text-gray-600">
                {alumni.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{alumni.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Batch of {alumni.batch}</span>
                </div>
                {alumni.degree && (
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    <span>{alumni.degree}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message
              </button>
              <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Connect
              </button>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        {alumni.bio && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3">About</h2>
            <p className="text-gray-700">{alumni.bio}</p>
          </div>
        )}

        {/* Professional Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Professional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alumni.company && (
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{alumni.company}</p>
                </div>
              </div>
            )}
            {alumni.job_title && (
              <div className="flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">{alumni.job_title}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <a href={`mailto:${alumni.email}`} className="text-blue-600 hover:underline">
                {alumni.email}
              </a>
            </div>
            {alumni.linkedin_url && (
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-gray-400" />
                <a 
                  href={alumni.linkedin_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    )
}