import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserRepositry } from './user.repositry';
import { CredentialsDto } from './dto/credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositry)
    private userRepository: UserRepositry,
  ) {}

  async signup(credentials: CredentialsDto): Promise<void> {
    this.userRepository.signup(credentials);
  }
}
