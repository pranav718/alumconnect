'use client'; // This component has user interaction, but no state

import { Search, X } from "lucide-react";
import { useSearchParams, useRouter } from 'next/navigation';

export function FilterBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClear = () => {
    router.push('/directory');
  };

  // The form's `action` attribute will automatically reload the page at this URL
  // with the form data as search parameters.
  return (
    <form action="/directory" method="GET" className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative w-full md:flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          name="search"
          key={searchParams?.get('search')} // Important to reset the input on navigation
          defaultValue={searchParams?.get('search') || ''}
          placeholder="Search by name, company, or location..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <input
          name="batch"
          type="number"
          key={searchParams?.get('batch')}
          defaultValue={searchParams?.get('batch') || ''}
          placeholder="Batch year..."
          className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>
      <div className="flex gap-2 w-full md:w-auto">
        <button type="submit" className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Filter
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="w-full md:w-auto bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-1"
        >
          <X className="w-4 h-4" /> Clear
        </button>
      </div>
    </form>
  );
}