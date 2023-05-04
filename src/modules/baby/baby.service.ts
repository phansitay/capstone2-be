import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Baby } from "../../entities";

@Injectable()
export class BabyService extends TypeOrmCrudService<Baby> {
  constructor(@InjectRepository(Baby) repo) {
    super(repo);
  }
}
