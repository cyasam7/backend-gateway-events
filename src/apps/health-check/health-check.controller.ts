import { Controller, Get } from '@nestjs/common';

@Controller('/health-check')
export class HealthCheckController {
  @Get('/')
  validate(): any {
    return { message: 'ok' };
  }
}
