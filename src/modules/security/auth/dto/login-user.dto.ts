import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDTO {
  @IsNotEmpty({ message: 'Введите почту или логин' })
  @IsString({ message: 'Логин или почта должна быть строкой' })
  login: string;

  @IsNotEmpty({ message: 'Введите пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
