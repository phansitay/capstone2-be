import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from "typeorm";
import { WithIdAndTimestamp } from "./withIdAndTimestamp";
import { ApiProperty } from "@nestjs/swagger";
import { BmiKid } from './bmi-kid';
import { UserEntity as Users } from './user.entity';

@Entity('baby', { schema: 'public' })
export class Baby extends WithIdAndTimestamp {
    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    birthDate: Date;

    @ApiProperty()
    @Column()
    isMale: boolean;

    @OneToMany(() => BmiKid, (bmiKid) => bmiKid.baby)
    bmiKs: BmiKid[];

    @ManyToOne(() => Users, (users) => users.babies)
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: Users;

    @RelationId((baby: Baby) => baby.user)
    userId: number | null;
}