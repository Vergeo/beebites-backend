import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Singleton-like: only one instance via NestJS DI
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateLogin(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await this.usersService.validatePassword(user, password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateLogin(loginDto.email, loginDto.password);
    const payload = { sub: user.userId, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    const payload = { sub: user.userId, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  authorizeAccess(user: any, requiredRole: string): boolean {
    return user.role === requiredRole;
  }
}
