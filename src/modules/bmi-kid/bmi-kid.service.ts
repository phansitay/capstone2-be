import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { BmiKid } from "../../entities";

@Injectable()
export class BmiKidService extends TypeOrmCrudService<BmiKid> {
  constructor(@InjectRepository(BmiKid) repo) {
    super(repo);
  }
}
