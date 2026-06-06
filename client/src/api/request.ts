import type { AxiosResponse } from 'axios'
import type { ApiResponse } from '../types/api/response.types'

export async function makeRequest<T>(
  request: Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<T> {
  const response = await request

  return response.data.data
}
