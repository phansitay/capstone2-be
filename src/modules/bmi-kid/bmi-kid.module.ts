import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BmiKid } from "../../entities";
import { BmiKidService } from "./bmi-kid.service";
import { AdminBmiKidController } from "./bmi-kid.controller.admin";
import { ClientBmiKidController } from "./bmi-kid.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([BmiKid])],
  providers: [BmiKidService],
  controllers: [AdminBmiKidController, ClientBmiKidController],
})
export class BmiKidModule {}
