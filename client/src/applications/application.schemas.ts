import { z } from 'zod'
import { applicationStatusSchema } from '@jobtrack/shared'

// Client-side form schema. All optional string fields accept empty string
// so controlled inputs stay uncontrolled-free. Empty strings are stripped
// to undefined before the API call in the submit handler.
export const applicationFormSchema = z.object({
  company: z.string().trim().min(1, 'Company is required'),
  role: z.string().trim().min(1, 'Role is required'),
  jobUrl: z.string().refine(
    (v) => v === '' || /^https?:\/\/.+/.test(v),
    { message: 'Must be a valid URL (https://…)' },
  ),
  location: z.string(),
  status: applicationStatusSchema,
  jobDescription: z.string(),
  notes: z.string(),
})

export type ApplicationFormValues = z.infer<typeof applicationFormSchema>
