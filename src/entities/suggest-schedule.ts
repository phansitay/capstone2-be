import { Column, Entity, Index, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { WithTimestamp } from "./withTimestamp";
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { BmiKid } from "./bmi-kid";

@Index("suggest_schedule_pkey", ["id"], { unique: true })
@Entity("suggest_schedule", { schema: "public" })
export class SuggestSchedule extends WithTimestamp {
  // @ApiProperty()
  // @Column('integer', { primary: true, name: 'id' })
  // id: number;

  @ApiProperty()
  @IsString()
  @Column("character varying", { name: "name", nullable: true })
  name: string | null;

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
}
