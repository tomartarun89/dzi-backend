import { BROKER_REPOSITORY } from '../../core/constants'
import { Broker } from '.';
export const brokerProviders = [
    {
        provide: BROKER_REPOSITORY,
        useValue: Broker
    }
]