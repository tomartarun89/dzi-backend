import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UsersService } from '../../users';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_PRIVATEKEY,
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOneById(payload.id);
        if (!user) {
            throw new UnauthorizedException('Unauthorized user.');
        }
        return payload;
    }
}