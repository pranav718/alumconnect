import { Briefcase, MapPin, GraduationCap } from 'lucide-react';

type Alumni = {
  id: string;
  name: string;
  batch: number;
  degree?: string | null; // Added degree field
  job_title?: string | null;
  company?: string | null;
  location?: string | null;
};

export function AlumniCard({ alumnus }: { alumnus: Alumni }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <h3 className="font-bold text-lg text-gray-900">{alumnus.name}</h3>
      <p className="text-sm font-medium text-indigo-600">Batch of {alumnus.batch}</p>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        {alumnus.job_title && alumnus.company && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span>{alumnus.job_title} at <strong>{alumnus.company}</strong></span>
          </div>
        )}
        {alumnus.degree && ( // This line was added/updated to show the degree
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
    </div>
  );
}