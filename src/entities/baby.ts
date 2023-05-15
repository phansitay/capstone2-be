import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { WithIdAndTimestamp } from "./withIdAndTimestamp";
import { ApiProperty } from "@nestjs/swagger";
import { BmiKid } from './bmi-kid';
import { UserEntity as Users } from './user.entity';
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

@Entity('baby', { schema: 'public' })
export class Baby extends WithIdAndTimestamp {
    @ApiProperty()
    @Column()
    @IsString()
    name: string;

    @ApiProperty()
    @Column()
    @IsString()
    time: string | null;

    @ApiProperty()
    @Column()
    @IsString()
    birthDate: Date;

    @ApiProperty()
    @Column()
    @IsBoolean()
    isMale: boolean;

    @OneToMany(() => BmiKid, (bmiKid) => bmiKid.baby)
    bmiKs: BmiKid[];

    @ManyToOne(() => Users, (users) => users.babies)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: Users;

    // @RelationId((baby: Baby) => baby.user)
    // userId: number | null;
    @Column()
    userId: number;
}