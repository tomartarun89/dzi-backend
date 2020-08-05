import { Inject, Injectable } from '@nestjs/common';

import { Broker, BrokerDto } from '.';
import { BROKER_REPOSITORY } from '../../core/constants';

@Injectable()
export class BrokersService {

    constructor(@Inject(BROKER_REPOSITORY) private readonly brokerRepository: typeof Broker) { }

    async create(broker: BrokerDto) {
        return await this.brokerRepository.create<Broker>(broker);
    }
    findAllBrokers() {

    }

}
