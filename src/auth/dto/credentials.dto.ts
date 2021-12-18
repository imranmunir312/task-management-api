import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  Matches,
  MaxLength,
} from 'class-validator';

export class CredentialsDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}
