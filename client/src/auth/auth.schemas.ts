import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.email('Please enter your email.'),
  password: z.string().min(1, 'Please enter your password.'),
  remember: z.boolean(),
})

export const registerFormSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.email("That email doesn't look right."),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  terms: z.boolean().refine((value) => value, 'Please accept the Terms and Privacy Policy to continue.'),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>
export type RegisterFormValues = z.infer<typeof registerFormSchema>
