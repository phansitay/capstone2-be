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
import { SuggestSchedule } from './suggest-schedule';
import { UserEntity as Users } from './user.entity';
import { Baby } from './baby';
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

@Index('bmi_kid_pkey', ['id'], { unique: true })
@Entity('bmi_kid', { schema: 'public' })
export class BmiKid extends WithTimestamp {
  // @ApiProperty()
  // @Column('integer', { primary: true, name: 'id' })
  // id: number;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'weight', nullable: true })
  weight: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'height', nullable: true })
  height: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'bmi', nullable: true })
  bmi: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'content', nullable: true })
  content: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'start_time', nullable: true })
  startTime: string | null;

  // @ApiProperty()
  // @Column('date', { name: 'end_time', nullable: true })
  // endTime: string | null;

  @ManyToOne(() => SuggestSchedule, (suggestSchedule) => suggestSchedule.bmiKs)
  @JoinColumn([{ name: 'schedule_id', referencedColumnName: 'id' }])
  schedule: SuggestSchedule;

  @ManyToOne(() => Baby, (baby) => baby.bmiKs)
  @JoinColumn([{ name: 'baby_id', referencedColumnName: 'id' }])
  baby: Baby;

  @RelationId((bmiKid: BmiKid) => bmiKid.schedule)
  scheduleId: number | null;

  @RelationId((bmiKid: BmiKid) => bmiKid.baby)
  userId: number | null;
}
