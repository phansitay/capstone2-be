import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { SuggestSchedule } from "../../entities";
import { SuggestScheduleService } from "./suggest-schedule.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: SuggestSchedule,
  },
  query: {
    alwaysPaginate: true,
    softDelete: true,
    join: {
      bmiKs: { eager: false },
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
@ApiTags("client/suggest-schedules")
@Controller("client/suggest-schedule")
export class ClientSuggestScheduleController
  implements CrudController<SuggestSchedule>
{
  constructor(public service: SuggestScheduleService) {}
}
