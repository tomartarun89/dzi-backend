import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

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
}