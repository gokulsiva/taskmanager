import { Controller, Delete, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/guards/jwt.auth.guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {}

    @ApiOperation({
        summary: 'List all users',
        description: 'Lists all the users signed up'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Get('/')
    getUsers() {
        return this.userService.getUsers();
    }

    @ApiOperation({
        summary: 'Get user details and tasks',
        description: 'List\'s users details along with tasks of the provided user id'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Get('/:id')
    getUserDetails(@Param('id', ParseIntPipe) uid: number) {
        return this.userService.getUserWithTasks(uid);
    }

    @ApiOperation({
        summary: 'Delete user account',
        description: 'Delete\'s the user account of the provided user id'
      })
    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) uid: number) {
        return this.userService.delete(uid);
    }
}
