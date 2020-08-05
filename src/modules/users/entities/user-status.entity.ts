import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { User } from './user.entity';
@Table({
    tableName: "user_status",
    timestamps: true
})
export class UserStatus extends Model<UserStatus>{

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    userStatusId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => User)
    users: User[]
}