import { z } from 'zod';

export const CreateAppoitmentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(8),
  address: z.string(),
  date: z.date(),
});
export type CreateAppoitmentValues = z.infer<typeof CreateAppoitmentSchema>;