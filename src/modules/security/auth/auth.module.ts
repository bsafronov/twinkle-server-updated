import { Module } from '@nestjs/common';
import { JwtStrategy } from '../strategy';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
