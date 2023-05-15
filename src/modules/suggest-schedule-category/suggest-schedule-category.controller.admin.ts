import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { SuggestScheduleCategory } from "src/entities/suggest-schedule-category";
import { SuggestScheduleCategoryService } from "./suggest-schedule-category.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: SuggestScheduleCategory,
  },
  query: {
    alwaysPaginate: true,
    softDelete: true,
    join: {
      suggestSchedules: { eager: false },
    },
  },
  routes: {
    only: [
      "getOneBase",
      "getManyBase",
      "createOneBase",
      "updateOneBase",
      "deleteOneBase",
    ],
    updateOneBase: {
      allowParamsOverride: true,
      returnShallow: true,
    },
  },
})
@ApiTags("admin/suggest-schedule-category")
@Controller("admin/suggest-scheduke-category")
export class AdminSuggestScheduleCategoryController implements CrudController<SuggestScheduleCategory> {
  constructor(public service: SuggestScheduleCategoryService) {}
}
