import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @IsString()
  @ApiProperty({ minLength: 6 })
  password: string;
}
