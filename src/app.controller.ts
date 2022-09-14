import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { ROLES } from './roles.enum';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(ROLES.ADMIN)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
