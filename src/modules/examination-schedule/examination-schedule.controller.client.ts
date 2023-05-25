import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";

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
@ApiTags("client/examination-schedule")
@Controller("client/examination-schedule")
@CrudAuth({
  persist: (req) => (console.log("userId",req?.user?.id), {userId: +req?.user?.id})
})
export class ClientExaminationScheduleController implements CrudController<ExaminationSchedule> {
  constructor(public service: ExaminationScheduleService) {}
}
