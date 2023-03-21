import { IsString } from 'class-validator';

export class AuthUserResponse {
  @IsString()
  token: string;
}
