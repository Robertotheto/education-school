import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const teacher = await this.authService.validateTeacherLocal(
      email,
      password,
    );
    if (!teacher) {
      throw new UnauthorizedException('Email or password is invalid');
    }
    return teacher;
  }
}
