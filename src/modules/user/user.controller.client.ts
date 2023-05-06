import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { UserEntity as User } from "../../entities";
import { UserService} from "./user.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: User,
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
@ApiTags("client/users")
@Controller("client/users")
export class ClientUserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
