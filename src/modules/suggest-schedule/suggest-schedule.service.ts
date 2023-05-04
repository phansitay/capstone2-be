import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { SuggestSchedule } from "../../entities";

@Injectable()
export class SuggestScheduleService extends TypeOrmCrudService<SuggestSchedule> {
  constructor(@InjectRepository(SuggestSchedule) repo) {
    super(repo);
  }
}
