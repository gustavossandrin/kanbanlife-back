import 'dotenv/config';
import { z } from 'zod';

const envsSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string(),
  })
  .transform((envs) => ({
    databaseUrl: envs.DATABASE_URL,
    nodeEnv: envs.NODE_ENV,
  }));

const envs = envsSchema.parse(process.env);

export default envs;
