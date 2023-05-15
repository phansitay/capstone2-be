import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { SuggestScheduleCategory} from "src/entities/suggest-schedule-category";


@Injectable()
export class SuggestScheduleCategoryService extends TypeOrmCrudService<SuggestScheduleCategory>{
  constructor(@InjectRepository(SuggestScheduleCategory)repo){
    super(repo);
  }
}
