import { Response } from 'express';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: UserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    checkAuthStatus(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    logout(req: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
