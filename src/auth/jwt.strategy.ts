import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Payload } from './payload.interface';
import { User } from './user.entity';
import { UserRepositry } from './user.repositry';

@Injectable()
export class JWTStartegy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepositry)
    private userRepositry: UserRepositry,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret2021',
    });
  }

  async validate(payload: Payload): Promise<User> {
    const { email } = payload;

    const user: User = await this.userRepositry.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
