import { z } from 'zod';

export const CreateAccountSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  user_id: z.string({ message: 'Id is required' }),
});
