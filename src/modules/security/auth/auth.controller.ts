import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuthGuard';
import { CreateUserDTO } from '../../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response/auth-user.response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  register(@Body() dto: CreateUserDTO): Promise<AuthUserResponse> {
    return this.authService.registration(dto);
  }

  @Post('/login')
  login(@Body() dto: LoginUserDTO) {
    if (dto.login.match(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i)) {
      return this.authService.loginViaEmail(dto);
    }

    return this.authService.loginViaUsername(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/check')
  check() {
    return true;
  }
}
