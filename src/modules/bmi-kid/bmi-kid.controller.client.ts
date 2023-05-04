import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { BmiKid } from "../../entities";
import { BmiKidService } from "./bmi-kid.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: BmiKid,
  },
  query: {
    alwaysPaginate: true,
    softDelete: true,
    join: {
      schedule: { eager: false },
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
@ApiTags("client/bmi-kids")
@Controller("client/bmi-kid")
export class ClientBmiKidController implements CrudController<BmiKid> {
  constructor(public service: BmiKidService) {}
}
