import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { GroupDto } from './dto/groups.dto';
import { GroupsService } from './groups.service';

@ApiTags('Permissions')
@ApiBearerAuth()
@Controller('permissions')
export class PermissionsController {

    constructor(private readonly groupsService: GroupsService) { }


    @Get('groups')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Returns all the groups.' })
    async getAllGroups() {
        const groups = await this.groupsService.findAllGroups();
        if (groups.length <= 0) {
            throw new HttpException({
                status: HttpStatus.OK,
                error: 'No data available'
            }, HttpStatus.OK);
        }
        const response = [];
        groups.forEach(group => {
            let temp = {
                groupId: group.groupId,
                name: group.name,
                description: group.description
            };
            response.push(temp);
        })
        return response;
    }

    @Post('groups')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Create a group.' })
    @HttpCode(HttpStatus.CREATED)
    async createGroup(@Body() group: GroupDto) {
        try {
            await this.groupsService.createGroup(group);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Put('groups/:groupSlug')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Update a group details.' })
    @HttpCode(HttpStatus.ACCEPTED)
    async updateGroup(@Param() params, @Body() body: GroupDto) {
        try {
            const groupId = parseInt(params.groupSlug);
            return await this.groupsService.updateGroup(groupId, body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('groups/:groupSlug')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Delete a group.' })
    @HttpCode(204)
    async deleteGroup(@Param() params) {
        try {
            const groupId = parseInt(params.groupSlug);
            if (groupId <= 0) {
                throw new HttpException('Invalid groupId.', HttpStatus.BAD_REQUEST);
            }
            await this.groupsService.deleteById(groupId);
        } catch (error) {
            throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
