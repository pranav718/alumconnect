import { supabase } from './supabase'; // Assuming you have this file from before

export async function getHomepageStats() {
  try {
    // 1. Get total alumni count directly from the database (very efficient)
    const { count: totalAlumni, error: countError } = await supabase
      .from('alumni')
      .select('*', { count: 'exact', head: true });

    if (countError) throw countError;

    // 2. Fetch all company and location data to calculate unique values
    const { data: alumniData, error: dataError } = await supabase
      .from('alumni')
      .select('company, location');

    if (dataError) throw dataError;

    // 3. Use JavaScript's Set to find unique companies and locations
    const uniqueCompanies = new Set(alumniData.map(a => a.company).filter(Boolean));
    const uniqueLocations = new Set(alumniData.map(a => a.location).filter(Boolean));

    return {
      totalAlumni: totalAlumni ?? 0,
      totalCompanies: uniqueCompanies.size,
      totalLocations: uniqueLocations.size,
      error: null
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      totalAlumni: 0,
      totalCompanies: 0,
      totalLocations: 0,
      error: 'Failed to fetch homepage stats.'
    };
  }
}


type AlumniFilters = {
  search?: string;
  batch?: number;
  location?: string;
  // You can add 'industry' here later
};

export async function getFilteredAlumni(filters: AlumniFilters) {
  try {
    let query = supabase.from('alumni').select('*');

    // Dynamically add filters to the query
    if (filters.search) {
      // 'ilike' is a case-insensitive search
      query = query.ilike('name', `%${filters.search}%`);
    }
    if (filters.batch) {
      // 'eq' means "equals"
      query = query.eq('batch', filters.batch);
    }
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    // Execute the final query
    const { data, error } = await query.order('name', { ascending: true });

    if (error) throw error;
    
    return { alumni: data || [], error: null };
  } catch (error) {
    console.error('Database Error:', error);
    return { alumni: [], error: 'Failed to fetch alumni data.' };
  }
}