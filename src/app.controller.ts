import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService
    ) {}

    @ApiOperation({
      summary: 'Login with email and password',
      description: 'Login into application with email and password for assessing further api\'s'
    })
    @Post('login')
    login(@Body() loginDto: LoginDto) {
      return this.authService.login(loginDto);
    }

    @ApiOperation({
      summary: 'Signup with email and password',
      description: 'Signup into application with email and password to login into application'
    })
    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.appService.signUp(createUserDto);
    }
}
