import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Brackets } from 'typeorm';
import { RolePermission } from '../../../entities';

@Injectable()
export class RolePermissionService extends TypeOrmCrudService<RolePermission> {
  constructor(@InjectRepository(RolePermission) repo) {
    super(repo);
  }

  async getOne(req) {
    const { parsed, options } = req;

    let id = req.parsed.paramsFilter[0].value;
    const role = req.parsed.paramsFilter[0].value;
    id = +id ? +id : -1;

    let builder = await this.createBuilder(parsed, options);
    builder = builder.where('id = :id', { id });
    builder = builder.orWhere(
      new Brackets((qb) => {
        qb.where({
          role,
        });
      }),
    );

    const result = await builder.getOne();
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
