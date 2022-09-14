import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './roles.decorator';
import { ROLES } from './roles.enum';
import { RolesGuard } from './roles.guard';

@UseGuards(JwtAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(ROLES.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getHello(@Request() req): string {
    return req.user;
  }
}
