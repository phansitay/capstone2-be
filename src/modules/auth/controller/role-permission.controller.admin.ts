import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudAuth, CrudController } from '@nestjsx/crud';
import { RolePermission as Entity } from '../../../entities';
import { RolePermissionService } from '../service/role-permissions.service';
import { Auth } from '../../../decorators';

@Auth({ checkRole: true })
@Crud({
  model: { type: Entity },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'updateOneBase',
      'deleteOneBase',
      'createOneBase',
    ],
  },
  params: {
    id: {
      type: 'string',
      primary: true,
      field: 'id',
    },
  },
  query: {
    softDelete: true,
    alwaysPaginate: true,
  },
})
@Controller('admin/role-permissions')
@ApiTags('admin/role-permissions')
@CrudAuth({
  persist: (req) => ({
    createdBy: req?.user,
  }),
})
export class AdminRolePermissionController implements CrudController<Entity> {
  constructor(public readonly service: RolePermissionService) {}
}
