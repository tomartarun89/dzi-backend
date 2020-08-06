import { Groups, UserGroupMapping } from '.';
import { GROUPS_REPOSITORY, USER_GROUP_MAPPING_REPOSITORY } from '../../core/constants';

export const groupsProvider = [
    {
        useValue: UserGroupMapping,
        provide: USER_GROUP_MAPPING_REPOSITORY
    },
    {
        useValue: Groups,
        provide: GROUPS_REPOSITORY
    }
]