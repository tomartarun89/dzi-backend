import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';

import { GROUPS_REPOSITORY } from '../../core/constants';
import { GroupDto } from './dto/groups.dto';
import { Groups } from './entities/groups.entity';

@Injectable()
export class GroupsService {

    constructor(@Inject(GROUPS_REPOSITORY) private readonly groupsRepository: typeof Groups) { }

    async findAllGroups(): Promise<Groups[]> {
        return await this.groupsRepository.findAll<Groups>();
    }

    async createGroup(group: GroupDto): Promise<Groups> {
        return await this.groupsRepository.create<Groups>(group);
    }

    async findOneById(groupId): Promise<Groups> {
        return await this.groupsRepository.findOne<Groups>({
            where: {
                groupId
            }
        });
    }

    async updateGroup(groupId, newData: GroupDto): Promise<Groups> {
        const group = await this.findOneById(groupId);
        if (!!group) {
            group.set('name', newData.name);
            group.set('description', newData.description);
            return await group.save();
        }
        else {
            throw new Error('Invalid group id.');
        }

    }

    async deleteById(groupId) {
        const group = await this.findOneById(groupId);
        if (!!group) {
            group.destroy();
        } else {
            throw new HttpException('Invalid groupId.', HttpStatus.BAD_REQUEST);
        }
    }
}
