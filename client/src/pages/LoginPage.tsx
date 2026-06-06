import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { loginFormSchema, type LoginFormValues } from '../auth/auth.schemas'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/atoms/Button'
import { Card } from '../components/ui/atoms/Card'
import { Input } from '../components/ui/atoms/Input'
import { ErrorAlert } from '../components/ui/molecules/ErrorAlert'
import { FormField } from '../components/ui/molecules/FormField'
import { useLogin } from '../hooks/auth.hooks'
import type { ApiError } from '../types/api/error.types'

function getLoginErrorMessage(error: ApiError) {
  if (error.status === 401) {
    return 'Invalid email or password. Please try again.'
  }

  if (error.status === 429) {
    return 'Too many sign-in attempts. Try again in 1 minute.'
  }

  return error.message || 'Something went wrong. Please try again.'
}

function applyFieldErrors(error: ApiError, setError: UseFormSetError<LoginFormValues>) {
  if (!error.errors) {
    return
  }

  for (const [field, message] of Object.entries(error.errors)) {
    if (field === 'email' || field === 'password') {
      setError(field, { message })
    }
  }
}

export function LoginPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
    resolver: zodResolver(loginFormSchema),
  })

  const onSubmit = handleSubmit((values) => {
    setServerError(null)
    loginMutation.mutate(
      {
        email: values.email,
        password: values.password,
      },
      {
        onError: (error) => {
          const apiError = error as unknown as ApiError
          applyFieldErrors(apiError, setError)
          setServerError(getLoginErrorMessage(apiError))
        },
        onSuccess: () => {
          navigate('/dashboard')
        },
      },
    )
  })

  return (
    <AuthLayout>
      <Card className="w-full max-w-[420px] p-7 sm:p-9">
        <h1 className="mb-1.5 text-[26px] font-bold tracking-[-0.02em] text-app-text">Welcome back</h1>
        <p className="mb-[22px] text-[13px] text-app-text-3">Sign in to continue tracking your job search.</p>
        {serverError ? <ErrorAlert message={serverError} /> : null}
        <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
          <FormField error={errors.email?.message} id="login-email" label="Email">
            <Input
              autoComplete="username"
              autoFocus
              hasError={Boolean(errors.email)}
              id="login-email"
              type="email"
              {...register('email')}
            />
          </FormField>
          <FormField error={errors.password?.message} id="login-password" label="Password">
            <Input
              autoComplete="current-password"
              hasError={Boolean(errors.password)}
              id="login-password"
              type="password"
              {...register('password')}
            />
          </FormField>
          <div className="flex items-center justify-between gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] text-app-text-2">
              <input className="size-4 rounded border-app-border text-app-primary focus:ring-app-primary" type="checkbox" {...register('remember')} />
              Remember me
            </label>
            <a className="text-[13px] font-medium text-app-primary hover:text-app-primary-600" href="/forgot-password">
              Forgot password?
            </a>
          </div>
          <Button className="w-full" disabled={loginMutation.isPending} size="lg" type="submit">
            {loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
        <p className="mt-6 text-center text-[13px] text-app-text-3 sm:hidden">
          Don't have an account?{' '}
          <a className="font-medium text-app-primary" href="/register">
            Create one
          </a>
        </p>
      </Card>
    </AuthLayout>
  )
}
