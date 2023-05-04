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

@Index('blog_pkey', ['id'], { unique: true })
@Entity('blog', { schema: 'public' })
export class Blog extends WithTimestamp {
  @ApiProperty()
  @Column('integer', { primary: true, name: 'id' })
  id: number;

  @ApiProperty()
  @Column('character varying', { name: 'name', nullable: true })
  name: string | null;

  @ApiProperty()
  @Column('character varying', { name: 'content', nullable: true })
  content: string | null;

  @ApiProperty()
  @Column('jsonb', { name: 'images', nullable: true })
  images: object | null;

  @ManyToOne(() => Users, (users) => users.blogs)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;

  @RelationId((blog: Blog) => blog.user)
  userId: number | null;
}
