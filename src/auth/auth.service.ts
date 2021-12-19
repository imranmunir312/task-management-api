import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepositry } from './user.repositry';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositry)
    private userRepository: UserRepositry,
    private jwtService: JwtService,
  ) {}

  async signup(credentials: CredentialsDto): Promise<void> {
    return this.userRepository.signup(credentials);
  }

  async signin(
    credentials: CredentialsDto,
  ): Promise<{ email: string; token: string }> {
    const user: User = await this.userRepository.validateUserPassword(
      credentials,
    );

    const payload: Payload = { email: user.email };
    const token: string = this.jwtService.sign(payload);

    return { email: user.email, token };
  }
}
