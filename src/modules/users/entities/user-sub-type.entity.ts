
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';
@Table({
    tableName: "user_sub_type",
    timestamps: true
})
export class UserSubType extends Model<UserSubType>{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    userSubTypeId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => User)
    users: User[]
}