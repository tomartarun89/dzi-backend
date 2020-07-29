import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
export class User extends Model<User> {

    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

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

    //TODO: Add a column for role mapping.
}