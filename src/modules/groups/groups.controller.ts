import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { GroupDto } from './dto/groups.dto';
import { GroupsService } from './groups.service';

@ApiTags('Permissions')
@Controller('permissions')
export class GroupsController {

    constructor(private readonly groupsService: GroupsService) { }
    @Get('groups')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Returns all the groups.' })
    async getAllGroups() {
        // TODO: Implement a custom serializer.
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
    async createGroup(@Body() group: GroupDto) {
        try {
            return await this.groupsService.createGroup(group);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
    @Put('groups/:groupSlug')
    @UseGuards(AuthGuard('jwt'))
    @ApiOperation({ summary: 'Update a group details.' })
    async updateGroup(@Param() params, @Body() body: GroupDto) {
        try {
            const groupId = parseInt(params.groupSlug);
            return await this.groupsService.updateGroup(groupId, body);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
