import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createApplication,
  deleteApplication,
  getApplication,
  listApplications,
  updateApplication,
} from '../api/applications.api'
import type { ApplicationStats, ListApplicationsParams } from '../types/application.types'
import type { CreateApplicationInput, UpdateApplicationInput } from '@jobtrack/shared'

export const applicationKeys = {
  all: ['applications'] as const,
  lists: () => [...applicationKeys.all, 'list'] as const,
  list: (params: ListApplicationsParams) => [...applicationKeys.lists(), params] as const,
  detail: (id: string) => [...applicationKeys.all, 'detail', id] as const,
  stats: () => [...applicationKeys.all, 'stats'] as const,
}

export function useApplications(params: ListApplicationsParams = {}) {
  return useQuery({
    queryKey: applicationKeys.list(params),
    queryFn: () => listApplications(params),
    retry: false,
  })
}

export function useApplication(id: string) {
  return useQuery({
    queryKey: applicationKeys.detail(id),
    queryFn: () => getApplication(id),
    retry: false,
    enabled: Boolean(id),
  })
}

export function useApplicationStats() {
  return useQuery({
    queryKey: applicationKeys.stats(),
    queryFn: async (): Promise<ApplicationStats> => {
      const [saved, applied, interviewing, offer, rejected] = await Promise.all([
        listApplications({ limit: 1, page: 1, status: 'SAVED' }),
        listApplications({ limit: 1, page: 1, status: 'APPLIED' }),
        listApplications({ limit: 1, page: 1, status: 'INTERVIEWING' }),
        listApplications({ limit: 1, page: 1, status: 'OFFER' }),
        listApplications({ limit: 1, page: 1, status: 'REJECTED' }),
      ])
      return {
        saved: saved.pagination.total,
        applied: applied.pagination.total,
        interviewing: interviewing.pagination.total,
        offers: offer.pagination.total,
        rejected: rejected.pagination.total,
        total:
          saved.pagination.total +
          applied.pagination.total +
          interviewing.pagination.total +
          offer.pagination.total +
          rejected.pagination.total,
      }
    },
    retry: false,
  })
}

export function useCreateApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateApplicationInput) => createApplication(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: applicationKeys.all })
    },
  })
}

export function useUpdateApplication(id: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: UpdateApplicationInput) => updateApplication(id, input),
    onSuccess: (data) => {
      queryClient.setQueryData(applicationKeys.detail(id), data)
      void queryClient.invalidateQueries({ queryKey: applicationKeys.lists() })
    },
  })
}

export function useDeleteApplication() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteApplication,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: applicationKeys.all })
    },
  })
}
