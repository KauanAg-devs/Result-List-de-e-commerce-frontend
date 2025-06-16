import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.getUser(email);
    if (!user) {
      throw new UnauthorizedException('User does not exist.');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Password does not match.');
    }

    return user;
  }

  async login(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  async signup(user: UserDto) {
    const { name, email, password } = user;

    if (await this.userService.getUser(email)) {
      throw new UnauthorizedException('this account already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return this.login(newUser);
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign(
        { email: payload.email, id: payload.id },
        { expiresIn: '15m' },
      );
      return { newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async findUserByEmail(email: string) {
    return this.userService.getUser(email);
  }
}
