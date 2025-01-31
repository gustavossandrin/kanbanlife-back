import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/http/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
let app;

async function bootstrap() {
  const expressAdapter = new ExpressAdapter(server);
  app = await NestFactory.create(AppModule, expressAdapter);
  await app.init();
  return server;
}

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(server => {
    server.listen(process.env.PORT ?? 8000);
  });
}

// Para a Vercel
export default bootstrap(); 