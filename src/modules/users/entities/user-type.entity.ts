import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';
@Table({
    tableName: "user_type",
    timestamps: true
})
export class UserType extends Model<UserType>{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    userTypeId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => User)
    users: User[]
}