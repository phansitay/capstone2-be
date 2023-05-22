import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { UserEntity as User } from "../../entities";
import { UserService } from "./user.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: User,
  },
  query: {
    alwaysPaginate: true,
    softDelete: true,
    join: {
      babies: { eager: false },
      blogs: {eager: false},
      bookDoctors: {eager: false}
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
@ApiTags("admin/users")
@Controller("admin/users")
export class AdminUserController implements CrudController<User> {
  constructor(public service: UserService) {}
}
