import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, type UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerFormSchema, type RegisterFormValues } from '../auth/auth.schemas'
import { AuthLayout } from '../components/auth/AuthLayout'
import { Button } from '../components/ui/atoms/Button'
import { Card } from '../components/ui/atoms/Card'
import { Input } from '../components/ui/atoms/Input'
import { CheckIcon, GoogleIcon, SparklesIcon } from '../components/ui/icons'
import { ErrorAlert } from '../components/ui/molecules/ErrorAlert'
import { FormField } from '../components/ui/molecules/FormField'
import { useRegister } from '../hooks/auth.hooks'
import type { ApiError } from '../types/api/error.types'

const benefitItems = [
  'Unlimited applications & notes',
  '25 AI tailoring runs / month, free',
  'Search, filter, and status pipeline',
  'Your data stays yours - export anytime',
]

function applyFieldErrors(error: ApiError, setError: UseFormSetError<RegisterFormValues>) {
  if (!error.errors) {
    return
  }

  for (const [field, message] of Object.entries(error.errors)) {
    if (field === 'name' || field === 'email' || field === 'password') {
      setError(field, { message })
    }
  }
}

export function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null)
  const registerMutation = useRegister()
  const navigate = useNavigate()

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormValues>({
    defaultValues: {
      email: '',
      name: '',
      password: '',
      terms: false,
    },
    resolver: zodResolver(registerFormSchema),
  })

  const onSubmit = handleSubmit((values) => {
    setServerError(null)
    registerMutation.mutate(
      {
        email: values.email,
        name: values.name,
        password: values.password,
      },
      {
        onError: (error) => {
          const apiError = error as unknown as ApiError
          applyFieldErrors(apiError, setError)
          setServerError(apiError.message || 'Something went wrong. Please try again.')
        },
        onSuccess: () => {
          navigate('/dashboard')
        },
      },
    )
  })

  return (
    <AuthLayout>
      <div className="grid w-full max-w-[980px] gap-7 md:grid-cols-2">
        <Card className="p-7 sm:p-9">
          <h1 className="mb-1.5 text-[26px] font-bold tracking-[-0.02em] text-app-text">Create your account</h1>
          <p className="mb-[26px] text-[13px] text-app-text-3">Start organizing your job search with JobTrack AI.</p>
          {serverError ? <ErrorAlert message={serverError} /> : null}
          <form className="flex flex-col gap-4" onSubmit={onSubmit} noValidate>
            <FormField error={errors.name?.message} id="register-name" label="Name">
              <Input
                autoComplete="name"
                autoFocus
                hasError={Boolean(errors.name)}
                id="register-name"
                placeholder="Your name"
                type="text"
                {...register('name')}
              />
            </FormField>
            <FormField error={errors.email?.message} id="register-email" label="Email">
              <Input
                autoComplete="email"
                hasError={Boolean(errors.email)}
                id="register-email"
                placeholder="you@email.com"
                type="email"
                {...register('email')}
              />
            </FormField>
            <FormField error={errors.password?.message} hint="At least 8 characters." id="register-password" label="Password">
              <Input
                autoComplete="new-password"
                hasError={Boolean(errors.password)}
                id="register-password"
                type="password"
                {...register('password')}
              />
            </FormField>
            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-5 text-app-text-2">
                <input className="mt-0.5 size-4 rounded border-app-border text-app-primary focus:ring-app-primary" type="checkbox" {...register('terms')} />
                <span>
                  I agree to the <a className="text-app-primary hover:text-app-primary-600" href="/terms">Terms</a> and{' '}
                  <a className="text-app-primary hover:text-app-primary-600" href="/privacy">Privacy Policy</a>.
                </span>
              </label>
              {errors.terms?.message ? <p className="mt-1.5 text-xs text-app-rose">{errors.terms.message}</p> : null}
            </div>
            <Button className="w-full" disabled={registerMutation.isPending} size="lg" type="submit">
              {registerMutation.isPending ? 'Creating account...' : 'Create Account'}
            </Button>
            <div className="flex items-center gap-3 text-xs text-app-text-4">
              <hr className="h-px flex-1 border-0 bg-app-border" />
              or
              <hr className="h-px flex-1 border-0 bg-app-border" />
            </div>
            <Button className="w-full" disabled variant="ghost">
              <GoogleIcon size={16} /> Continue with Google
            </Button>
          </form>
          <p className="mt-6 text-center text-[13px] text-app-text-3 sm:hidden">
            Already have an account?{' '}
            <a className="font-medium text-app-primary" href="/login">
              Sign in
            </a>
          </p>
        </Card>

        <aside className="hidden rounded-[14px] bg-[linear-gradient(160deg,var(--color-app-primary)_0%,var(--color-app-violet)_100%)] p-9 text-white shadow-card-md md:flex md:flex-col md:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/16 px-2.5 py-1 text-[11px] font-medium tracking-[0.05em] uppercase text-white">
              <SparklesIcon size={12} /> Free forever plan
            </span>
            <h2 className="mt-5 mb-3.5 text-[28px] leading-[1.2] font-bold tracking-[-0.02em]">Get your job search out of the spreadsheet.</h2>
            <p className="text-[14.5px] leading-[1.55] text-white/85">
              Track unlimited applications, generate up to 25 AI tailoring suggestions per month, and never lose track of where you applied again.
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-3.5">
            {benefitItems.map((item) => (
              <div className="flex items-center gap-2.5 text-sm font-medium" key={item}>
                <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-white/18">
                  <CheckIcon size={13} />
                </span>
                {item}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </AuthLayout>
  )
}
