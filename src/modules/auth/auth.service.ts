import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User, UsersService } from '../users';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        const user: User = await this.userService.findOneByEmail(username);
        if (!user) {
            return null;
        }
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }
        const payload = {
            id: user.getDataValue('id'),
            email: user.getDataValue('email')
        }
        return payload;
    }

    public async login(user) {
        const token = await this.generateToken(user);
        return { token: token };
    }

    public async create(user) {
        const pass = await this.hashPassword(user.password);
        const newUser = await this.userService.create({ ...user, password: pass });
        const { id, email } = newUser['dataValues'];
        const userData = { id: id, email: email };
        const token = await this.generateToken(userData);
        return { user: userData, token };
    }

    private async generateToken(user) {
        const token = await this.jwtService.signAsync(user);
        return token;
    }

    private async hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    private async comparePassword(enteredPassword: string, dbPassword: string) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    async updatePassword(email, oldPassword, newPassword) {
        if (oldPassword === newPassword) {
            throw new HttpException('Old password and the new password should be different.', HttpStatus.BAD_REQUEST);
        }
        const user = await this.userService.findOneByEmail(email);
        const check = await this.comparePassword(oldPassword, user.password);
        if (!check) {
            throw new HttpException('Old password and the existing password does not matches.', HttpStatus.FORBIDDEN);
        }
        user.set('password', await this.hashPassword(newPassword));
        user.save();
    }
}