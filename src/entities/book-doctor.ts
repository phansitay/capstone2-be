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

@Index('book_doctor_pkey', ['id'], { unique: true })
@Entity('book_doctor', { schema: 'public' })
export class BookDoctor extends WithTimestamp {
  @ApiProperty()
  @Column('integer', { primary: true, name: 'id' })
  id: number;

  @ApiProperty()
  @Column('date', { name: 'start_time', nullable: true })
  startTime: string | null;

  @ApiProperty()
  @Column('date', { name: 'end_time', nullable: true })
  endTime: string | null;

  @ApiProperty()
  @Column('character varying', { name: 'content', nullable: true })
  content: string | null;

  @ApiProperty()
  @Column('character varying', { name: 'status', nullable: true })
  status: string | null;

  @ManyToOne(() => Users, (users) => users.doctors)
  @JoinColumn([{ name: 'doctor_id', referencedColumnName: 'id' }])
  doctor: Users;

  @ManyToOne(() => Users, (users) => users.users)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @RelationId((bookDoctor: BookDoctor) => bookDoctor.doctor)
  doctorId: number | null;

  @RelationId((bookDoctor: BookDoctor) => bookDoctor.user)
  userId: number | null;
}
