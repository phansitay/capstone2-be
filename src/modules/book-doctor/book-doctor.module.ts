import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { BookDoctor } from "../../entities";
import { BookDoctorService } from "./book-doctor.service";
import { AdminBookDoctorController } from "./book-doctor.controller.admin";
import { ClientBookDoctorController } from "./book-doctor.controller.client";

@Module({
  imports: [TypeOrmModule.forFeature([BookDoctor])],
  providers: [BookDoctorService],
  controllers: [AdminBookDoctorController, ClientBookDoctorController],
})
export class BookDoctorModule {}
