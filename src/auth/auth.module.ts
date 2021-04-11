import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWTStrategy } from 'src/strategy/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  exports: [AuthService],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '1234567890',
      signOptions: {
        expiresIn: '30m'
      }
    }),
    UsersModule
  ],
  providers: [AuthService, JWTStrategy]
})
export class AuthModule {}
