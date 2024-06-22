import { z } from 'zod';

export const ListAccountSchema = z.object({
  user_id: z.string({ message: 'Id is required' }),
});
