import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";

import { Auth } from "../../decorators";
import { BookDoctor } from "../../entities";
import { BookDoctorService } from "./book-doctor.service";

@Auth({ checkRole: true })
@Crud({
  model: {
    type: BookDoctor,
  },
  query: {
    alwaysPaginate: true,
    softDelete: true,
    join: {
      doctor: { eager: false },
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
@ApiTags("admin/book-doctors")
@Controller("admin/book-doctor")
export class AdminBookDoctorController implements CrudController<BookDoctor> {
  constructor(public service: BookDoctorService) {}
}
