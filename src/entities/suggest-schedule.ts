import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { WithTimestamp } from "./withTimestamp";
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { BmiKid } from "./bmi-kid";
import { SuggestScheduleCategory } from "./suggest-schedule-category";

// @Index("suggest_schedule_pkey", ["id"], { unique: true })
@Entity("suggest_schedule", { schema: "public" })
export class SuggestSchedule extends WithTimestamp {
  // @ApiProperty()
  // @Column('integer', { primary: true, name: 'id' })
  // id: number;

  @ApiProperty()
  @IsString()
  @Column("character varying", { name: "begin_time", nullable: true })
  beginTime: string | null;

  @ApiProperty()
  @IsString()
  @Column("character varying", { name: "end_time", nullable: true })
  endTime: string | null;

  @ApiProperty()
  @IsString()
  @Column("character varying", { name: "content", nullable: true })
  content: string | null;

  @ApiProperty()
  @IsString()
  @Column("character varying", { name: "note", nullable: true })
  note: string | null;

  @ApiProperty()
  @Column("jsonb", { name: "range", nullable: true })
  range: object | null;

  @OneToMany(() => BmiKid, (bmiKid) => bmiKid.schedule)
  bmiKs: BmiKid[];

  @ManyToOne(() => SuggestScheduleCategory, (suggestScheduleCategorys) => suggestScheduleCategorys.suggestSchedules)
    @JoinColumn([{referencedColumnName: 'id' }])
    suggestScheduleCategory: SuggestScheduleCategory;

  @Column()
  @ApiProperty()
  suggestScheduleCategoryId: number;

    // @Column()
    // scheduleCategory: number | null;
}
