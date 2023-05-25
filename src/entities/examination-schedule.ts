import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { WithTimestamp } from './withTimestamp';
import { UserEntity, UserEntity as Users } from './user.entity';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { WithIdAndTimestamp } from './withIdAndTimestamp';

@Index('examination-schedule_pkey', ['id'], { unique: true })
@Entity('examination-schedule', { schema: 'public' })
export class ExaminationSchedule extends WithIdAndTimestamp {
  // @ApiProperty()
  // @Column('integer', { primary: true, name: 'id' })
  // id: number;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'begin_time', nullable: true })
  beginTime: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'end_time', nullable: true })
  endTime: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'status', nullable: true })
  status: string | null;



  @ManyToOne(() => Users, (users) => users.examinationSchedule)
  @JoinColumn([{referencedColumnName: 'id' }])
  user: Users;

  @Column()
  @ApiProperty()
  userId: number;
}
