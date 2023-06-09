import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudAuth, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { Blog } from "../../entities";
import { BlogService } from "./blog.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: Blog,
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
@ApiTags("client/blogs")
@Controller("client/blogs")
@CrudAuth({
  persist: (req) => (console.log("userId",req?.user?.id), {userId: +req?.user?.id})
})
export class ClientBlogController implements CrudController<Blog> {
  constructor(public service: BlogService) {}
}
