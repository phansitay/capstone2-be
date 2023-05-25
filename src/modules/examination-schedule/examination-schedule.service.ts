import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ExaminationSchedule } from "src/entities/examination-schedule";

@Injectable()
export class ExaminationScheduleService extends TypeOrmCrudService<ExaminationSchedule> {
  constructor(@InjectRepository(ExaminationSchedule) repo) {
    super(repo);
  }
}
