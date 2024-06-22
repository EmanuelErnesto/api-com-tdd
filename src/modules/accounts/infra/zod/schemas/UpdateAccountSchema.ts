import { z } from 'zod';

export const UpdateAccountSchema = z.object({
  id: z.string({ message: 'id is required' }),
  name: z.string({ message: 'Name is required' }),
  user_id: z.string({ message: 'user_id is required' }),
});
