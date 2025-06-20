import { PrismaService } from 'src/prisma.service';
import { UserDto } from './user.dto';
export declare class UserService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getUser(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createUser(data: UserDto): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
