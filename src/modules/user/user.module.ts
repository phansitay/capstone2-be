import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity as User } from "../../entities";
import { UserService } from "./user.service";
import { AdminUserController } from "./user.controller.admin";
import { ClientUserController } from "./user.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [AdminUserController, ClientUserController],
})
export class UserModule {}
