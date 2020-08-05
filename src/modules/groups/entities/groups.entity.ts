import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';

import { User } from '../../users';
import { UserGroupMapping } from './user-group-mapping.entity';
import { Exclude } from 'class-transformer';

@Table({
    tableName: 'groups',
    timestamps: true
})
export class Groups extends Model<Groups>{

    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    })
    groupId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 30]
        }
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        validate: {
            max: 200
        }
    })
    description: string;
    @BelongsToMany(() => User, () => UserGroupMapping)
    users: User[];
}