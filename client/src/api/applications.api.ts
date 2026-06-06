import { apiClient, makeRequest } from '.'
import type { CreateApplicationInput, UpdateApplicationInput } from '@jobtrack/shared'
import type { Application, ListApplicationsParams, ListApplicationsResponse } from '../types/application.types'

export function listApplications(params: ListApplicationsParams = {}): Promise<ListApplicationsResponse> {
  return makeRequest<ListApplicationsResponse>(
    apiClient.get('/api/applications', { params }),
  )
}

export function getApplication(id: string): Promise<{ application: Application }> {
  return makeRequest<{ application: Application }>(
    apiClient.get(`/api/applications/${id}`),
  )
}

export function createApplication(input: CreateApplicationInput): Promise<{ application: Application }> {
  return makeRequest<{ application: Application }>(
    apiClient.post('/api/applications', input),
  )
}

export function updateApplication(id: string, input: UpdateApplicationInput): Promise<{ application: Application }> {
  return makeRequest<{ application: Application }>(
    apiClient.patch(`/api/applications/${id}`, input),
  )
}

export function deleteApplication(id: string): Promise<{ success: true }> {
  return makeRequest<{ success: true }>(
    apiClient.delete(`/api/applications/${id}`),
  )
}
