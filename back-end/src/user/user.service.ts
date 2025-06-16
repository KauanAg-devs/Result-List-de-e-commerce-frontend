import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUser(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async createUser(data: UserDto) {
    return this.prismaService.user.create({
      data,
    });
  }
}
