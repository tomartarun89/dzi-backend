import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

import { UserDto } from '../users';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @ApiOperation({ summary: 'Login end-point.' })
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signup')
    @ApiOperation({ summary: 'Create user end-point.' })
    async signUp(@Body() user: UserDto) {
        return await this.authService.create(user);
    }

    @Post('update-password')
    @UseGuards(AuthGuard('jwt'))
    async updatePassword(@Body() body, @Request() req): Promise<any> {
        const { oldPassword, newPassword } = body;
        await this.authService.updatePassword(req.user.id, oldPassword, newPassword);
        return { message: 'Successfully changed the password.' };
    }
}