export type ApplicationStatus = 'Saved' | 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'

export type SampleApplication = {
  company: string
  id: number
  role: string
  status: ApplicationStatus
}

export const sampleApplications: SampleApplication[] = [
  { id: 1, company: 'Google', role: 'Senior Frontend Developer', status: 'Applied' },
  { id: 2, company: 'Monday.com', role: 'Full Stack Developer', status: 'Interviewing' },
  { id: 3, company: 'Wix', role: 'React Developer', status: 'Saved' },
  { id: 4, company: 'Microsoft', role: 'Software Engineer II', status: 'Rejected' },
  { id: 5, company: 'StartupX', role: 'Senior Node.js Developer', status: 'Offer' },
]

export const companyColors: Record<string, string> = {
  Google: '#4285F4',
  'Monday.com': '#FF3D57',
  Microsoft: '#0078D4',
  StartupX: '#7C3AED',
  Wix: '#0C6EFC',
}

export function getCompanyColor(name: string) {
  return companyColors[name] ?? '#4F46E5'
}
