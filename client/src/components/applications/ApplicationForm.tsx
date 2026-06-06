import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { applicationFormSchema, type ApplicationFormValues } from '../../applications/application.schemas'
import type { Application } from '../../types/application.types'
import type { CreateApplicationInput, UpdateApplicationInput } from '@jobtrack/shared'
import { Button } from '../ui/atoms/Button'
import { Card } from '../ui/atoms/Card'
import { Input } from '../ui/atoms/Input'
import { Textarea } from '../ui/atoms/Textarea'
import { ErrorAlert } from '../ui/molecules/ErrorAlert'
import { FormField } from '../ui/molecules/FormField'
import { StatusSelector } from '../ui/molecules/StatusSelector'

type ApplicationFormProps = {
  mode: 'create' | 'edit'
  defaultValues?: Application
  onSubmit: (data: CreateApplicationInput | UpdateApplicationInput) => void
  isPending: boolean
  serverError: string | null
}

function toApiPayload(values: ApplicationFormValues): CreateApplicationInput {
  return {
    company: values.company.trim(),
    role: values.role.trim(),
    jobUrl: values.jobUrl.trim() || undefined,
    location: values.location.trim() || undefined,
    status: values.status,
    jobDescription: values.jobDescription.trim() || undefined,
    notes: values.notes.trim() || undefined,
  }
}

function toFormValues(app: Application): ApplicationFormValues {
  return {
    company: app.company,
    role: app.role,
    jobUrl: app.jobUrl ?? '',
    location: app.location ?? '',
    status: app.status,
    jobDescription: app.jobDescription ?? '',
    notes: app.notes ?? '',
  }
}

export function ApplicationForm({
  mode,
  defaultValues,
  onSubmit,
  isPending,
  serverError,
}: ApplicationFormProps) {
  const navigate = useNavigate()

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ApplicationFormValues>({
    defaultValues: defaultValues
      ? toFormValues(defaultValues)
      : {
          company: '',
          role: '',
          jobUrl: '',
          location: '',
          status: 'SAVED',
          jobDescription: '',
          notes: '',
        },
    resolver: zodResolver(applicationFormSchema),
  })

  const submitHandler = handleSubmit((values) => {
    onSubmit(toApiPayload(values))
  })

  return (
    <Card className="p-6 sm:p-8">
      {serverError ? <ErrorAlert message={serverError} /> : null}
      <form className="flex flex-col gap-5" onSubmit={submitHandler} noValidate>
        {/* Row 1: Company + Role */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField id="app-company" label="Company" error={errors.company?.message}>
            <Input
              id="app-company"
              placeholder="Acme Corp"
              hasError={Boolean(errors.company)}
              {...register('company')}
            />
          </FormField>
          <FormField id="app-role" label="Role" error={errors.role?.message}>
            <Input
              id="app-role"
              placeholder="Senior Engineer"
              hasError={Boolean(errors.role)}
              {...register('role')}
            />
          </FormField>
        </div>

        {/* Row 2: Job URL + Location */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField id="app-jobUrl" label="Job URL" optional error={errors.jobUrl?.message}>
            <Input
              id="app-jobUrl"
              type="url"
              placeholder="https://jobs.example.com/…"
              hasError={Boolean(errors.jobUrl)}
              {...register('jobUrl')}
            />
          </FormField>
          <FormField id="app-location" label="Location" optional error={errors.location?.message}>
            <Input
              id="app-location"
              placeholder="Remote, New York, NY…"
              hasError={Boolean(errors.location)}
              {...register('location')}
            />
          </FormField>
        </div>

        {/* Status */}
        <FormField id="app-status" label="Status" error={errors.status?.message}>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <StatusSelector value={field.value} onChange={field.onChange} />
            )}
          />
        </FormField>

        {/* Job description */}
        <FormField
          id="app-jobDescription"
          label="Job description"
          hint="Paste the job description now or add it later for AI tailoring."
          error={errors.jobDescription?.message}
        >
          <Textarea
            id="app-jobDescription"
            rows={6}
            placeholder="Paste the full job description here…"
            hasError={Boolean(errors.jobDescription)}
            {...register('jobDescription')}
          />
        </FormField>

        {/* Notes */}
        <FormField
          id="app-notes"
          label="Notes"
          optional
          hint="Recruiter contact, salary band, interview prep — anything for future you."
          error={errors.notes?.message}
        >
          <Textarea
            id="app-notes"
            rows={3}
            placeholder="Add any notes…"
            hasError={Boolean(errors.notes)}
            {...register('notes')}
          />
        </FormField>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-app-border pt-5 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/applications')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? mode === 'create'
                ? 'Saving…'
                : 'Saving changes…'
              : mode === 'create'
                ? 'Save Application'
                : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Card>
  )
}
