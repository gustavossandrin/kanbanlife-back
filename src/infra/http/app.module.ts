import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HealthModule,
    AuthModule,
  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
