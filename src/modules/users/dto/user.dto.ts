import { IsNotEmpty, MinLength, IsEmail, Length } from 'class-validator';

export class UserDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;

    @IsNotEmpty()
    @Length(10, 10)
    readonly mobile: string;
}