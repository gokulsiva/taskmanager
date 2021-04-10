import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UsersService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.userService.getUserByEmailAndPassword(email, pass);
        if(user) {
            return user;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if(user) {
            const payload = {
                email: user.email,
                uid: user.uid
            }
            return {
                accessToken: this.jwtService.sign(payload)
            };
        }
        return {
            message: 'Invalid Email/Password'
        }
    }
}
