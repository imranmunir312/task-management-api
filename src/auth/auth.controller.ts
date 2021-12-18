import { CredentialsDto } from './dto/credentials.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
  async signup(@Body() credentials: CredentialsDto): Promise<void> {
    this.authService.signup(credentials);
  }
}
