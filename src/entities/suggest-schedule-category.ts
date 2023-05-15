import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import {IsString } from "class-validator";
import { SuggestSchedule } from "./suggest-schedule";
import { WithIdAndTimestamp } from "./withIdAndTimestamp";

@Entity('suggest-schedule-category')
export class SuggestScheduleCategory extends WithIdAndTimestamp {
    @ApiProperty()
    @Column()
    @IsString()
    name: string;

    @ApiProperty()
    @Column()
    @IsString()
    content: string;

    @OneToMany(() => SuggestSchedule, (suggestSchedules) => suggestSchedules.suggestScheduleCategory)
    suggestSchedules: SuggestSchedule[];
}