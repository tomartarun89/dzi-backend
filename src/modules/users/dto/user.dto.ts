import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length, MinLength } from 'class-validator';

export class UserDto {

    @IsNotEmpty()
    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly middleName: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @Exclude()
    readonly groupId: number;

    @ApiProperty()
    readonly is2FAEnabled: boolean;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @Length(10, 10)
    @ApiProperty()
    readonly mobile: string;

    @ApiProperty()
    readonly isActive: boolean;

    //Excluded properties

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    @Exclude({ toPlainOnly: true })
    readonly password: string;

    @Exclude({ toPlainOnly: true })
    readonly userTypeId
    @Exclude({ toPlainOnly: true })
    readonly userSubTypeId
    @Exclude({ toPlainOnly: true })
    readonly userStatusId
    @Exclude({ toPlainOnly: true })
    readonly brokerId
    @Exclude({ toPlainOnly: true })
    readonly createdAt
    @Exclude({ toPlainOnly: true })
    readonly updatedAt

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}