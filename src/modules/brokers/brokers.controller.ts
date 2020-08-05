import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { BrokerDto } from '.';
import { BrokersService } from './brokers.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('brokers')
export class BrokersController {

    constructor(private readonly brokerService: BrokersService) { }

    @Post()
    @ApiOperation({ summary: 'Create broker.' })
    @ApiTags('B2B')
    @UseGuards(AuthGuard('jwt'))
    async addBroker(@Body() body: BrokerDto) {
        return await this.brokerService.create(body);
    }

}
