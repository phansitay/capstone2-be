import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthUser } from '../../../decorators';
import { AuthRefreshToken } from '../../../decorators';
import { AuthService } from '../service/auth.service';
import { LoginRequestDto } from '../dto/login-request.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegisterDto } from '../dto/register.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(public readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register user with email and password return the access token',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'User info with access token',
  })
  async userRegister(
    @Body() userRegisterDto: RegisterDto,
  ): Promise<LoginResponseDto> {
    return this.authService.userRegister(userRegisterDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login user with email and password return the access token',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'User info with access token',
  })
  async userLogin(@Body() userLogin: LoginRequestDto) {
    return this.authService.validateUser(userLogin);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Generate access token From refresh token',
  })
  @ApiOkResponse({
    type: LoginResponseDto,
    description: 'User info with access token',
  })
  @AuthRefreshToken()
  async refreshToken(@AuthUser() user) {
    return this.authService.generateToken(user);
  }
}
