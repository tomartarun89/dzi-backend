import { Sequelize } from 'sequelize-typescript';

import { User, UserStatus, UserSubType, UserType } from '../../modules/users';
import { Broker } from '../../modules/brokers';
import { DEVELOPMENT, PRODUCTION, SEQUELIZE, TEST } from '../constants';
import { databaseConfig } from './database.config';
import { Groups, UserGroupMapping } from "../../modules/groups";

export const databaseProviders = [{
    provide: SEQUELIZE,
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
            case DEVELOPMENT:
                config = databaseConfig.development;
                break;
            case TEST:
                config = databaseConfig.test;
                break;
            case PRODUCTION:
                config = databaseConfig.production;
                break;
            default:
                config = databaseConfig.development;
        }
        const sequelize = new Sequelize(config);
        sequelize.addModels([User, UserSubType, UserType, UserStatus, Broker, Groups, UserGroupMapping]);
        await sequelize.sync(
            // { force: true }
        );
        return sequelize;
    },
}];