import { z } from 'zod';

export const ShowUserSchema = z.object({
  id: z.string({ message: 'id is required' }).regex(/^\d+$/),
});
