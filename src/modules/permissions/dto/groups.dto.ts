import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

import { Groups } from '../entities/groups.entity';

export class GroupDto {

    @ApiProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty()
    readonly description: string;

    @Exclude({ toPlainOnly: true })
    readonly createdAt
    @Exclude({ toPlainOnly: true })
    readonly updatedAt

    constructor(partial: Partial<GroupDto>) {
        Object.assign(this, partial);
    }
}

export class GroupsDto {
    @Type(() => GroupDto)
    groups: Groups[]
    constructor() { }
}