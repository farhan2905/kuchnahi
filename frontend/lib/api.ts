const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  year?: string;
  tags?: string[];
  featured: boolean;
  layoutType: string;
  accentColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  name: string;
  tagline: string;
  iconUrl: string;
  description?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryInput {
  email: string;
  message: string;
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  
  return response.json();
}

export async function fetchServices(): Promise<Service[]> {
  const response = await fetch(`${API_BASE_URL}/api/services`, {
    cache: 'no-store',
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch services');
  }
  
  return response.json();
}

export async function submitInquiry(data: InquiryInput): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit inquiry');
  }
  
  return response.json();
}
