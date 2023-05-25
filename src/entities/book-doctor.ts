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
import { UserEntity as Users } from './user.entity';
import { WithIdAndTimestamp } from './withIdAndTimestamp';
import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";

@Index('book_doctor_pkey', ['id'], { unique: true })
@Entity('book_doctor', { schema: 'public' })
export class BookDoctor extends WithIdAndTimestamp {
  // @ApiProperty()
  // @Column('integer', { primary: true, name: 'id' })
  // id: number;

  @ApiProperty()
  @Column('date', { name: 'start_time', nullable: true })
  startTime: string | null;

  @ApiProperty()
  @Column('date', { name: 'end_time', nullable: true })
  endTime: string | null;

  @ApiProperty()
  @Column('date', { name: 'today', nullable: true })
  today: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'content', nullable: true })
  content: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'status', nullable: true })
  status: string | null;

  @ManyToOne(() => Users, (users) => users.bookDoctors)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;


  // @RelationId((bookDoctor: BookDoctor) => bookDoctor.doctor)
  // doctorId: number | null;

  // @ManyToOne(() => Users, (users) => users.bookDoctors)
  // @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  // user: Users;

  @Column()
  userId: number;

}
