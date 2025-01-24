import { z } from 'zod';

export const labelSchema = z.object({
  title: z.string().min(1)
}); 