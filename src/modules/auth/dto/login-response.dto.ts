import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../../entities/user.entity';

export class LoginResponseDto {
  @ApiProperty({ type: UserEntity })
  data: UserEntity;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  message: string;

  @ApiProperty()
  refreshToken: string;

  constructor(data: UserEntity, accessToken: string) {
    this.data = data;
    this.accessToken = accessToken;
  }
}
