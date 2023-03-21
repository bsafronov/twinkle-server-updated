import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiError } from 'src/errors';
import { CreateUserDTO } from 'src/modules/user/dto/create-user.dto';
import { UserService } from '../../user/user.service';
import { TokenService } from '../token/token.service';
import { LoginUserDTO } from './dto/login-user.dto';
import { AuthUserResponse } from './response/auth-user.response';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(dto: CreateUserDTO): Promise<AuthUserResponse> {
    let existUser = await this.userService.findByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(ApiError.EMAIL_EXIST);
    }

    existUser = await this.userService.findByUsername(dto.username);

    if (existUser) {
      throw new BadRequestException(ApiError.USERNAME_EXIST);
    }

    const user = await this.userService.createUser(dto);

    const token = await this.tokenService.generateJwtToken(user);

    return { token };
  }

  async loginViaUsername(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findByUsername(dto.login, true);

    if (!existUser) {
      throw new BadRequestException(ApiError.USERNAME_NOT_EXIST);
    }

    const isPassValidated = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!isPassValidated) {
      throw new BadRequestException(ApiError.WRONG_PASSWORD);
    }
    const token = await this.tokenService.generateJwtToken(existUser);

    return { token };
  }

  async loginViaEmail(dto: LoginUserDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findByEmail(dto.login, true);

    if (!existUser) {
      throw new BadRequestException(ApiError.EMAIL_NOT_EXIST);
    }

    const isPassValidated = await bcrypt.compare(
      dto.password,
      existUser.password,
    );

    if (!isPassValidated) {
      throw new BadRequestException(ApiError.WRONG_PASSWORD);
    }

    const token = await this.tokenService.generateJwtToken(existUser);

    return { token };
  }
}
