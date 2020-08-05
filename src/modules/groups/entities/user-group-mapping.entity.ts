import { Column, DataType, ForeignKey, Model, Table, PrimaryKey } from 'sequelize-typescript';

import { User } from '../../users';
import { Groups } from './groups.entity';

@Table({
    tableName: 'user-group-mapping',
    timestamps: true
})
export class UserGroupMapping extends Model<UserGroupMapping>{


    @ForeignKey(() => User)
    @Column({
        primaryKey: true
    })
    userId: number;

    @ForeignKey(() => Groups)
    @Column({
        primaryKey: true
    })
    groupId: number;

    @Column({
        type: DataType.STRING
    })
    accessType: string

}