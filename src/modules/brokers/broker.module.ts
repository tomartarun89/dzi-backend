import { Module } from '@nestjs/common';

import { BrokersController } from './brokers.controller';
import { brokerProviders } from './brokers.providers';
import { BrokersService } from './brokers.service';

@Module({
    controllers: [BrokersController],
    providers: [BrokersService, ...brokerProviders]
})
export class BrokersModule { }
