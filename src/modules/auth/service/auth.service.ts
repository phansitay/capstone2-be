import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../entities/user.entity';
import { Repository } from 'typeorm';
import { LoginResponseDto } from '../dto/login-response.dto';
import { RegisterDto } from '../dto/register.dto';
import { EncryptionUtil } from '../../../common/utils/encryption-hashing.util';
import { LoginRequestDto } from '../dto/login-request.dto';
import { ConfigService } from '@nestjs/config';
import { CommonUtil } from '../../../common/utils/common.util';

export class IToken {
  refreshToken: string;
  accessToken: string;
}
@Injectable()
export class AuthService {
  private refreshTokenSecret: string;
  private refreshTokenExpire: number | string;

  constructor(
    public readonly jwtService: JwtService,
    public readonly config: ConfigService,
    @InjectRepository(UserEntity) private _userRepo: Repository<UserEntity>,
  ) {
    this.refreshTokenSecret = CommonUtil.getSecretRefreshToken(
      config.get<string>('jwt.secret'),
    );
    this.refreshTokenExpire = config.get<string | number>('jwt.rfExpireTime');
  }

  async userRegister(dto: RegisterDto): Promise<LoginResponseDto> {
    const existUser = await this._userRepo.findOne({
      where: {
        email: dto.email,
      },
    });
    // if (!dto.role) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.BAD_REQUEST,
    //       messageCode: 'role.required',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    if (existUser) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          messageCode: 'auth.email_used',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    const createdUser = await this.createUser(dto);
    const { accessToken, refreshToken } = await this.createToken(createdUser);
    delete createdUser.password;
    return {
      refreshToken,
      accessToken,
      data: createdUser,
      message: 'auth.login_success',
    };
  }

  async createUser(userRegisterDto: RegisterDto): Promise<UserEntity> {
    if (userRegisterDto.password) {
      userRegisterDto.password = EncryptionUtil.generateHash(
        userRegisterDto.password,
      );
    }
    return this._userRepo.save({
      ...userRegisterDto,
    });
  }

  createToken(data: UserEntity): IToken {
    const { id, role, email, firstName, lastName } = data;
    const refreshToken = this.jwtService.sign(
      {
        id,
        email,
        role,
        firstName,
        lastName,
      },
      {
        secret: this.refreshTokenSecret,
        expiresIn: this.refreshTokenExpire,
      },
    );

    return {
      refreshToken,
      accessToken: this.jwtService.sign({
        id,
        email,
        role,
        firstName,
        lastName,
      }),
    };
  }

  generateToken(user) {
    delete user.iat;
    delete user.exp;
    const { accessToken, refreshToken } = this.createToken(user);
    return {
      accessToken,
      refreshToken,
      data: user,
      message: 'auth.login_success',
    };
  }

  async validateUser(userLoginDto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this._userRepo.findOne({
      where: {
        email: userLoginDto.email,
        isActive: true,
      },
      select: ['password', 'email', 'id', 'firstName', 'lastName', 'role'],
    });

    const isPasswordValid = await EncryptionUtil.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    if (!user || !isPasswordValid) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          messageCode: 'auth.email_pass_incorrect',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    user.password = undefined;

    const { accessToken, refreshToken } = await this.createToken(user);
    return {
      accessToken,
      refreshToken,
      data: user,
      message: 'auth.login_success',
    };
  }
}
