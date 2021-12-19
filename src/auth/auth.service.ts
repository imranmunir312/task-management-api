import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepositry } from './user.repositry';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositry)
    private userRepository: UserRepositry,
  ) {}

  async signup(credentials: CredentialsDto): Promise<void> {
    return this.userRepository.signup(credentials);
  }

  async signin(credentials: CredentialsDto): Promise<User> {
    return this.userRepository.validateUserPassword(credentials);
  }
}
