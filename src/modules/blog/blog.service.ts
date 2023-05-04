import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import { Blog } from "../../entities";

@Injectable()
export class BlogService extends TypeOrmCrudService<Blog> {
  constructor(@InjectRepository(Blog) repo) {
    super(repo);
  }
}
