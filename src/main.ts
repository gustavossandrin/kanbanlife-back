import { NestFactory } from '@nestjs/core';
import { AppModule } from './infra/http/app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const server = express();
let app;

async function bootstrap() {
  const expressAdapter = new ExpressAdapter(server);
  app = await NestFactory.create(AppModule, expressAdapter);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  await app.init();
  return server;
}

if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(server => {
    server.listen(process.env.PORT ?? 8000);
  });
}

export default bootstrap(); 