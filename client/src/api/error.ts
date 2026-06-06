import axios from 'axios'
import type { ApiError, ApiErrorResponse } from '../types/api/error.types'

function isApiErrorResponse(data: unknown): data is ApiErrorResponse {
  return (
    typeof data === 'object' &&
    data !== null &&
    'code' in data &&
    'message' in data &&
    typeof data.code === 'string' &&
    typeof data.message === 'string'
  )
}

export function buildApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data

    if (isApiErrorResponse(data)) {
      return {
        code: data.code,
        message: data.message,
        errors: data.errors,
        status,
      }
    }

    if (!error.response) {
      return {
        code: 'NETWORK_ERROR',
        message: 'Network error. Please try again.',
      }
    }
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Something went wrong',
  }
}
