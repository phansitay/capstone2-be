import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const { UPDATE, CREATE } = CrudValidationGroups;

export class RegisterDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  @MaxLength(50)
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  @MaxLength(50)
  lastName: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(50)
  @IsOptional({ groups: [UPDATE] })
  @Transform(({ value }) => value?.toLowerCase())
  email: string;

  @IsString()
  @ApiProperty({ minLength: 6 })
  @MaxLength(50)
  @MinLength(6)
  @IsOptional()
  password: string;

  @ApiProperty()
  // @Matches(/(84|840)(3|5|7|8|9){1}([0-9]{8})$/, {
  //   message: 'Phone number is wrong format',
  // })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty()
  @IsOptional({ groups: [UPDATE, CREATE] })
  role: string;
}
