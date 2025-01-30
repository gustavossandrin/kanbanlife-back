import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [HealthModule, AuthModule],
  controllers: [],
})
export class AppModule {}
