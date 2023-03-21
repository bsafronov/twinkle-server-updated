import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':query')
  async findOne(@Param('query') query: string) {
    if (query.match(/^[0-9][0-9a-z]/)) {
      const user = await this.userService.findById(query);
      return user;
    }

    const user = await this.userService.findByUsername(query);

    return user;
  }
}
