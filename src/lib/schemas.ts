import { z } from 'zod'

export const expenseCategorySchema = z.enum([
  'Food',
  'Transport',
  'Bills',
  'Shopping',
  'Entertainment',
  'Health',
  'Education',
  'Other',
])

export type ExpenseCategory = z.infer<typeof expenseCategorySchema>

export const createExpenseSchema = z.object({
  amount: z.number().positive('Amount must be a positive number'),
  category: expenseCategorySchema,
  description: z.string().min(1, 'Description is required').max(500),
  expense_date: z.string().or(z.date()),
})

export const updateExpenseSchema = createExpenseSchema.partial()

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>
export type UpdateExpenseInput = z.infer<typeof updateExpenseSchema>
