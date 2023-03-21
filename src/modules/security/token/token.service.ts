import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/schemas/user.schema';
import { TokenAuthDTO } from './dto/token-auth.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateJwtToken(data: User): Promise<string> {
    const user: TokenAuthDTO = {
      id: data.id,
      email: data.email,
      username: data.username,
    };
    const payload = { user };

    return this.jwtService.sign(payload, {
      expiresIn: process.env.TOKEN_EXPIRES_IN,
      secret: process.env.TOKEN_SECRET_KEY,
    });
  }
}
