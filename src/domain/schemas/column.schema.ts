import { z } from 'zod';

export const columnSchema = z.object({
  name: z.string().min(1),
  maxTasks: z.number().min(0),
  position: z.number().min(0),
  code: z.number(),
  projectId: z.string().uuid()
}); 