import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { Baby } from "../../entities";
import { BabyService} from "./baby.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: Baby,
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
@ApiTags("client/babies")
@Controller("client/babies")
@CrudAuth({
  persist: (req) => (console.log("userId",req?.user?.id), {userId: +req?.user?.id})
})
export class ClientBabyController implements CrudController<Baby> {
  constructor(public service: BabyService) {}
}
