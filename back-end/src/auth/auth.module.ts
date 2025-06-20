import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

const authModules = [
  UserModule,
  PassportModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET || 'default-secret-key',
    signOptions: { expiresIn: '15m' },
  }),
];

@Module({
  imports: [...authModules],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
