import * as z from 'zod';
import { ZodSchema } from 'zod';

export const profileSchema = z.object({
    firstName: z.string()
        .min(3, { message: 'First Name is too short' })
        .max(15, { message: 'First Name is too long' }),
    lastName: z.string()
        .min(3, { message: 'Last Name is too short' })
        .max(15, { message: 'Last Name is too long' }),
})