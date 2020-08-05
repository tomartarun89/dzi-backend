import { Body, Controller, Post, Request, UseGuards, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserDto } from '../users';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
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
    
    @Put('update-password')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Update the user password.' })
    async updatePassword(@Body() body: UpdatePasswordDto, @Request() req): Promise<any> {
        const { oldPassword, newPassword } = body;
        await this.authService.updatePassword(req.user.email, oldPassword, newPassword);
        return { message: 'Successfully changed the password.' };
    }
}