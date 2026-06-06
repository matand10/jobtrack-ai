export type ApiErrorResponse = {
  code: string
  message: string
  errors?: Record<string, string>
}

export type ApiError = ApiErrorResponse & {
  status?: number
}
