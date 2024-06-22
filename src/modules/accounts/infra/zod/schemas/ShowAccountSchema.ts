import { z } from 'zod';

export const ShowAccountSchema = z.object({
  id: z.string({ message: 'id is required' }),
  user_id: z.string({ message: 'user_id is required' }),
});
