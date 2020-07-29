import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User, UsersService } from '.';

@Controller()
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    async getUser(@Request() req) {
        const user: User = await this.userService.findOneById(req.user.id);
        const { password, createdAt, updatedAt, ...data } = <any>user.get({ plain: true });
        return data;
    }
}
