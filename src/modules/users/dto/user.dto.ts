import { ApiProperty } from '@nestjs/swagger';
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
    readonly groupId: number;

    @ApiProperty()
    readonly is2FAEnabled: boolean;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty()
    readonly password: string;

    @IsNotEmpty()
    @Length(10, 10)
    @ApiProperty()
    readonly mobile: string;

    @ApiProperty()
    readonly isActive: boolean;
}