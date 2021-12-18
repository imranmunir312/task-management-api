import { BadRequestException, ConflictException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class UserRepositry extends Repository<User> {
  async signup(credentials: CredentialsDto): Promise<void> {
    const { email, password } = credentials;

    const user = new User();

    user.email = email;
    user.password = await bcrypt.hash(password, 10);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new BadRequestException();
      }
    }
  }
}
