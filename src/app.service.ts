import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {

  constructor(private readonly userService: UsersService) {}

  signUp(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }
}
