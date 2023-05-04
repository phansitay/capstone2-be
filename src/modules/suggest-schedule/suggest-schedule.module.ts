import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SuggestSchedule } from "../../entities";
import { SuggestScheduleService } from "./suggest-schedule.service";
import { AdminSuggestScheduleController } from "./suggest-schedule.controller.admin";
import { ClientSuggestScheduleController } from "./suggest-schedule.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([SuggestSchedule])],
  providers: [SuggestScheduleService],
  controllers: [
    AdminSuggestScheduleController,
    ClientSuggestScheduleController,
  ],
})
export class SuggestScheduleModule {}
