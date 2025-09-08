// src/app/components/AlumniCard.tsx
import { Briefcase, MapPin, GraduationCap, Calendar, Mail } from 'lucide-react';

type Alumni = {
  id: string;
  name: string;
  batch: number;
  degree?: string | null;
  job_title?: string | null;
  company?: string | null;
  location?: string | null;
  email?: string;
};

export function AlumniCard({ alumnus }: { alumnus: Alumni }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{alumnus.name}</h3>
          <p className="text-sm font-medium text-indigo-600">Batch of {alumnus.batch}</p>
        </div>
        <div className="bg-indigo-50 px-2 py-1 rounded-full">
          <Calendar className="w-4 h-4 text-indigo-600" />
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        {alumnus.job_title && alumnus.company && (
          <div className="flex items-start gap-2">
            <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium text-gray-900">{alumnus.job_title}</span>
              <span className="text-gray-600"> at </span>
              <span className="font-medium text-gray-900">{alumnus.company}</span>
            </div>
          </div>
        )}
        
        {alumnus.degree && (
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{alumnus.degree}</span>
          </div>
        )}
        
        {alumnus.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{alumnus.location}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">Click to view profile</span>
          <div className="flex gap-2">
            {alumnus.email && (
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <Mail className="w-4 h-4 text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}