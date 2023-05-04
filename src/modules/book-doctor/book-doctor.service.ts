import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { BookDoctor } from "../../entities";

@Injectable()
export class BookDoctorService extends TypeOrmCrudService<BookDoctor> {
  constructor(@InjectRepository(BookDoctor) repo) {
    super(repo);
  }
}
