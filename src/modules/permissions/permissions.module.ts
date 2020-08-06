import { Module } from '@nestjs/common';

import { PermissionsController } from './permissions.controller';
import { groupsProvider } from './groups.provider';
import { GroupsService } from './groups.service';

@Module({
  controllers: [PermissionsController],
  providers: [GroupsService, ...groupsProvider],
  exports: [GroupsService]
})
export class PermissionsModule { }
