import 'dotenv/config';
import { z } from 'zod';

const envsSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string(),
    TOKEN_SECRET: z.string(),
    AWS_ACCESS_KEY_ID: z.string(),
    AWS_SECRET_ACCESS_KEY: z.string(),
    FOCUS_PROD_API_URL: z.string().url(),
    FOCUS_HML_API_URL: z.string().url(),
    FOCUS_API_KEY: z.string(),
    REDIS_HOST: z.string().optional(),
    REDIS_CLUSTER_NODES: z.string().optional(),
    REDIS_PASSWORD: z.string().optional(),
    REDIS_PORT: z.string().transform(Number),
    SENTRY_DSN: z.string(),
    WEBHOOK_HOST: z.string(),
    RECEIPT_STATUS_WEBHOOK_PATH: z.string().optional(),
  })
  .refine((envs) => {
    if (envs.NODE_ENV === 'production') {
      return !!envs.REDIS_CLUSTER_NODES;
    } else if (envs.NODE_ENV === 'development') {
      return !!envs.REDIS_HOST;
    }

    return true;
  }, 'Redis host or cluster nodes is required')
  .transform((envs) => ({
    databaseUrl: envs.DATABASE_URL,
    tokenSecret: envs.TOKEN_SECRET,
    awsAccessKeyId: envs.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
    focusProdApiUrl: envs.FOCUS_PROD_API_URL,
    focusHmlApiUrl: envs.FOCUS_HML_API_URL,
    focusApiKey: envs.FOCUS_API_KEY,
    redisHost: envs.REDIS_HOST,
    redisClusterNodes: envs.REDIS_CLUSTER_NODES?.split(',') ?? [],
    redisPort: envs.REDIS_PORT,
    redisPassword: envs.REDIS_PASSWORD,
    nodeEnv: envs.NODE_ENV,
    sentryDsn: envs.SENTRY_DSN,
    webhookHost: envs.WEBHOOK_HOST,
    receiptStatusWebhookPath:
      envs.RECEIPT_STATUS_WEBHOOK_PATH ??
      'f183920b-c48a-44e4-9122-0d3eb0093cab/webhook/receipt-status',
  }));

const envs = envsSchema.parse(process.env);

export default envs;
