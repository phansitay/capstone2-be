import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { ExaminationSchedule } from "src/entities/examination-schedule";
import { ExaminationScheduleService } from "./examination-schedule.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: ExaminationSchedule,
  },
  query: {
    alwaysPaginate: true,
    softDelete: true,
    join: {
      user: { eager: false },
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
@ApiTags("admin/examination-schedule")
@Controller("admin/examination-schedule")
export class AdminExaminationScheduleController implements CrudController<ExaminationSchedule> {
  constructor(public service: ExaminationScheduleService) {}
}
