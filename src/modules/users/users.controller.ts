import { ClassSerializerInterceptor, Controller, Get, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '.';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('B2B')
export class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get('/profile')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(ClassSerializerInterceptor)
    async getUser(@Request() req) {
        const user = (await this.userService.findOneByEmail(req.user.email)).get({ plain: true });
        const data = new UserDto(user);
        return data;
    }

    @Get('/types')
    @UseGuards(AuthGuard('jwt'))
    async getUserTypes() {
        let data = await this.userService.findAllUserTypes();
        let result = [];
        data.forEach(userType => {
            const temp = {
                id: userType.getDataValue('userTypeId'),
                name: userType.getDataValue('name')
            }
            result.push(temp);
        })
        return result;
    }
}
