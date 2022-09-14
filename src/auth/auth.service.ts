import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({where: {
            email
        }});
        if (user && await bcrypt.compare(password, user.password)) {
          const { password, ...result } = user;
          return result;
        }
        return null;
      }
    
      async login(user: User) {
        const payload = { email: user.email, id: user.id, role: user.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }

}
