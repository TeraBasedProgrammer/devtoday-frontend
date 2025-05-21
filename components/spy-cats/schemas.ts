import { z } from 'zod';

export const spyCatCreateSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  breed: z.string().min(1, 'Breed is required').max(100, 'Breed must be less than 100 characters'),
  experience: z.number().int().positive('Experience must be a positive number'),
  salary: z.number().int().positive('Salary must be a positive number'),
});

export const spyCatEditSchema = z.object({
  salary: z.number().int().positive('Salary must be a positive number'),
});

export type SpyCatCreateInput = z.infer<typeof spyCatCreateSchema>;
export type SpyCatEditInput = z.infer<typeof spyCatEditSchema>;

export interface SpyCat {
  id: string;
  name: string;
  breed: string;
  experience: number;
  salary: number;
  created_at: string;
  updated_at: string;
}
