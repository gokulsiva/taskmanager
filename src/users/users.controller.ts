import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './../dto/create.user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @Get('/')
    getUsers() {
        return this.userService.getUsers();
    }

    @Get('/:id')
    getUserDetails(@Param('id', ParseIntPipe) uid: number) {
        return this.userService.getUserWithTasks(uid);
    }

    @Post('/create')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) uid: number) {
        return this.userService.delete(uid);
    }
}
