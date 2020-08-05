import { Module } from '@nestjs/common';

import { GroupsController } from './groups.controller';
import { groupsProvider } from './groups.provider';
import { GroupsService } from './groups.service';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService, ...groupsProvider],
  exports: [GroupsService]
})
export class GroupsModule { }
