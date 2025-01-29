import { Module } from '@nestjs/common';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [HealthModule],
  controllers: [],
})
export class AppModule {}
