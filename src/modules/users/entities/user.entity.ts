import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

import { Broker } from '../../brokers';
import { Groups, UserGroupMapping } from '../../permissions';
import { UserStatus } from './user-status.entity';
import { UserSubType } from './user-sub-type.entity';
import { UserType } from './user-type.entity';

@Table({
    tableName: 'users'
})
export class User extends Model<User> {

    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column(DataType.STRING)
    middleName: string;

    @Column(DataType.STRING)
    lastName: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        comment: 'Check the status of 2 Factor Authentication.'
    })
    is2FAEnabled: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        comment: 'Represents the status of the account'
    })
    isActive: boolean;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true,
        validate: {
            len: [10, 10]
        }
    })
    mobile: string;


    @ForeignKey(() => UserType)
    @Column({
        type: DataType.INTEGER
    })
    userTypeId: number;


    @ForeignKey(() => UserSubType)
    @Column({
        type: DataType.INTEGER
    })
    userSubTypeId: number;

    @ForeignKey(() => UserStatus)
    @Column({
        type: DataType.INTEGER
    })
    userStatusId: number;

    @ForeignKey(() => Broker)
    @Column({
        type: DataType.INTEGER
    })
    brokerId: number;

    @BelongsToMany(() => Groups, () => UserGroupMapping)
    groups: Groups[];

    @BelongsTo(() => UserType)
    userType: UserSubType

    @BelongsTo(() => UserSubType)
    userSubType: UserSubType

    @BelongsTo(() => UserStatus)
    userStatus: UserStatus

    @BelongsTo(() => Broker)
    broker: Broker;
}