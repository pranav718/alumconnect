export interface Alumni {
    id: string,
    email: string,
    name: string,
    batch: number,
    degree: string | null,
    job_title: string | null,
    company: string | null,
    location: string | null,
    bio: string | null,
    linkedin_url: string | null,
    created_at: string
}

export interface Post {
    id: string,
    alumni_id: string,
    content: string,
    type: string,
    created_at: string
}