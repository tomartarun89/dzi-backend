import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

import { User } from '../../users';

@Table({
    tableName: 'intermediary_masters',
    timestamps: true
})
export class Broker extends Model<Broker>{

    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    brokerName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    brokerType: string;


    @HasMany(() => User)
    users: User[]

}