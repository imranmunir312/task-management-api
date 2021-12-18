import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CredentialsDto } from './dto/credentials.dto';

@EntityRepository(User)
export class UserRepositry extends Repository<User> {
  async createNewUser(credentials: CredentialsDto): Promise<void> {
    const { username, password } = credentials;

    const user = new User();
    user.username = username;
    user.password = password;

    await user.save();
  }
}
