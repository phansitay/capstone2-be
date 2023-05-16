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
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { WithIdAndTimestamp } from './withIdAndTimestamp';

@Index('blog_pkey', ['id'], { unique: true })
@Entity('blog', { schema: 'public' })
export class Blog extends WithIdAndTimestamp {
  // @ApiProperty()
  // @Column('integer', { primary: true, name: 'id' })
  // id: number;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'content', nullable: true })
  content: string | null;

  @ApiProperty()
  @IsString()
  @Column('character varying', { name: 'images', nullable: true })
  images: string | null;


  @ManyToOne(() => Users, (users) => users.blogs)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @Column()
  userId: number;
}
