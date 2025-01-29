import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';

@Controller('/')
export class HealthController {

  @Get('/health')
  healthCheck() {
    return 'OK';
  }
}
