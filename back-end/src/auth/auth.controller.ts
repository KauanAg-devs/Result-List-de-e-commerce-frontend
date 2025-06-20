import {
  Controller,
  Post,
  UseGuards,
  Body,
  Req,
  Res,
  UnauthorizedException,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserDto } from 'src/user/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
  })
  async signup(@Body() user: UserDto, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.signup(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'Logged in successfully' });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
  })
  async login(@Req() req: any, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(
      req.user,
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'Logged in successfully' });
  }

  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed',
  })
  @Post('refresh')
  async refresh(@Req() req: any, @Res() res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token found');
    }

    const { newAccessToken } =
      await this.authService.refreshToken(refreshToken);

    res.cookie('accessToken', newAccessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.json({ message: 'token refreshed' });
  }

  @ApiOperation({ summary: 'Check auth status' })
  @ApiResponse({
    status: 200,
    description: 'Return the auth status',
  })
  @Get('status')
  async checkAuthStatus(@Req() req: any, @Res() res: Response) {
    const token = req.cookies['accessToken'];

    if (!token) {
      return res.status(401).json({ isAuthenticated: false });
    }

    try {
      await this.authService.validateToken(token);
      return res.json({ isAuthenticated: true });
    } catch {
      return res.status(401).json({ isAuthenticated: false });
    }
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
  })
  async logout(@Req() req: any, @Res() res: Response) {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      path: '/',
      domain: 'localhost',
    });
    res.clearCookie('accessToken', {
      httpOnly: false,
      path: '/',
      domain: 'localhost',
    });
    return res.json({ message: 'Logged out successfully' });
  }
}
