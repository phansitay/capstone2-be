import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Baby } from "../../entities";
import { CrudRequest } from "@nestjsx/crud";
import { DeepPartial } from "typeorm";

@Injectable()
export class BabyService extends TypeOrmCrudService<Baby> {
  constructor(@InjectRepository(Baby) repo) {
    super(repo);
  }  
}
