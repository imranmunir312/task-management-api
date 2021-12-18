import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './user.entity';
import { UserRepositry } from './user.repositry';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepositry)
    private userRepositry: UserRepositry,
  ) {}

  async signup(credentials: CredentialsDto): Promise<void> {
    this.userRepositry.createNewUser(credentials);
  }
}
