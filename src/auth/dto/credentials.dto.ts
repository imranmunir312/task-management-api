import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(6)
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsString()
  @MaxLength(20)
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/, {
    message: 'Password too weak',
  })
  password: string;
}
