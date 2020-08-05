import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class BrokerDto {

    @IsNotEmpty()
    @ApiProperty()
    readonly brokerName: string;

    @IsNotEmpty()
    @ApiProperty()
    readonly brokerType: string;

    @Exclude({ toPlainOnly: true })
    readonly createdAt
    @Exclude({ toPlainOnly: true })
    readonly updatedAt

    constructor(partial: Partial<BrokerDto>) {
        Object.assign(this, partial);
    }
}