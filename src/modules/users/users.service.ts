import { Inject, Injectable } from '@nestjs/common';

import { User, UserDto, UserType } from '.';
import { USER_REPOSITORY, USERTYPE_REPOSITORY } from '../../core/constants';

@Injectable()
export class UsersService {

    constructor(
        @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
        @Inject(USERTYPE_REPOSITORY) private readonly userTypesRepository: typeof UserType
    ) { }

    async create(user: UserDto): Promise<User> {
        return await this.userRepository.create<User>(user);
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { email } });
    }

    async findOneById(userId: number): Promise<User> {
        return await this.userRepository.findOne<User>({ where: { userId } });
    }

    async findAllUserTypes(): Promise<UserType[]> {
        return await this.userTypesRepository.findAll<UserType>();
    }
}