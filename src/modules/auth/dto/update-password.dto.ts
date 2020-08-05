import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsNotEmpty()
    @ApiProperty()
    @MinLength(8)
    readonly oldPassword: string;

    @IsNotEmpty()
    @ApiProperty()
    @MinLength(8)
    readonly newPassword: string;
}