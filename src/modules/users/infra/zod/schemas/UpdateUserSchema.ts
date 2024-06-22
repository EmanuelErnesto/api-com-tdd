import { z } from 'zod';

export const UpdateUserSchema = z.object({
  id: z.string({ message: 'id is required' }).regex(/^\d+$/),
  name: z.string(),
  email: z.string().email({ message: 'Invalid email format' }),
  password: z.string(),
});
