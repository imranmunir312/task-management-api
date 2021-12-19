import { User } from './user.entity';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() credentials: CredentialsDto): Promise<void> {
    return this.authService.signup(credentials);
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Body() credentials: CredentialsDto): Promise<User> {
    return this.authService.signin(credentials);
  }
}
