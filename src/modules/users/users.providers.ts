import { User, UserType } from '.';
import { USER_REPOSITORY, USERTYPE_REPOSITORY } from '../../core/constants';

export const usersProviders = [{
    provide: USER_REPOSITORY,
    useValue: User,
}, {
    provide: USERTYPE_REPOSITORY,
    useValue: UserType
}];