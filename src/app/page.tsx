import { getFilteredAlumni } from "@/lib/data";
import { FilterBar } from "@/components/FilterBar";
import { AlumniCard } from "@/components/AlumniCard";
import { Suspense } from 'react';

// A separate component for the results to use with Suspense
async function AlumniResults({ search, batch }: { search: string; batch: string; }) {
  const batchNumber = batch ? Number(batch) : undefined;
  const { alumni, error } = await getFilteredAlumni({ search, batch: batchNumber });

  if (error) {
    return <p className="text-center text-red-500 mt-8">Could not load alumni data. Please try again later.</p>;
  }

  if (alumni.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No alumni found matching your criteria.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {alumni.map(person => (
        <AlumniCard key={person.id} alumnus={person} />
      ))}
    </div>
  );
}

// A simple loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams?: { search?: string; batch?: string; };
}) {
  const search = searchParams?.search || '';
  const batch = searchParams?.batch || '';

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Alumni Network</h1>
        <p className="text-lg text-gray-600 mt-2">Discover and connect with peers from our community.</p>
      </div>

      <FilterBar />

      <Suspense key={search + batch} fallback={<LoadingSkeleton />}>
        <AlumniResults search={search} batch={batch} />
      </Suspense>
    </div>
  );
}