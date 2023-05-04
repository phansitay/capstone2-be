import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

import { WithIdAndTimestamp } from './withIdAndTimestamp';

export interface IRolePermission {
  [k: string]: string[];
}

@Entity('auth_role_permission')
export class RolePermission extends WithIdAndTimestamp {
  @ApiPropertyOptional()
  @IsString()
  @Column({ nullable: false })
  role: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @Column({ nullable: false, default: true })
  isActive: boolean;

  @ApiProperty()
  @IsOptional()
  @Column({ nullable: true, type: 'jsonb' })
  createdBy: any;

  @ApiProperty()
  @IsOptional()
  @Column({ nullable: true, type: 'jsonb' })
  permissions: IRolePermission;
}
