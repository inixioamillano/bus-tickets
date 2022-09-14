import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { ROLES } from './roles.enum';
import { User } from './user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<ROLES[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const {user} = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
