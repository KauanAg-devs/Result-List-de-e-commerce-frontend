import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '@prisma/client';
import { UserDto } from 'src/user/user.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateToken(token: string): Promise<any>;
    validateUser(email: string, password: string): Promise<User | null>;
    login(user: User): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    signup(user: UserDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshToken(refreshToken: string): Promise<{
        newAccessToken: string;
    }>;
    findUserByEmail(email: string): Promise<{
        id: string;
        name: string;
        email: string;
        password: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
