import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, RolePermission } from '../../entities';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { RolePermissionService } from './service/role-permissions.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refresh-jwt.strategy';
import { AdminRolePermissionController } from './controller/role-permission.controller.admin';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RolePermission]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: config.get<string | number>('jwt.expireTime'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    RefreshJwtStrategy,
    RolePermissionService,
  ],
  exports: [AuthService],
  controllers: [AuthController, AdminRolePermissionController],
})
export class AuthModule {}
