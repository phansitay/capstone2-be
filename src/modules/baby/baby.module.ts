import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Baby } from "../../entities";
import { BabyService } from "./baby.service";
import { AdminBabyController } from "./baby.controller.admin";
import { ClientBabyController } from "./baby.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([Baby])],
  providers: [BabyService],
  controllers: [AdminBabyController, ClientBabyController],
})
export class BabyModule {}
