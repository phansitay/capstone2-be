import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExaminationSchedule } from "src/entities/examination-schedule";
import { ExaminationScheduleService } from "./examination-schedule.service";
import { AdminExaminationScheduleController } from "./examination-schedule.controller.admin";
import { ClientExaminationScheduleController } from "./examination-schedule.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([ExaminationSchedule])],
  providers: [ExaminationScheduleService],
  controllers: [AdminExaminationScheduleController, ClientExaminationScheduleController],
})
export class ExaminationScheduleModule {}
