import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { WithIdAndTimestamp } from './withIdAndTimestamp';
import { instanceToPlain, Exclude } from 'class-transformer';
import { RoleType } from '../common/constants/enum-entity';
import { Blog } from './blog';
import { BmiKid } from './bmi-kid';
import { BookDoctor } from './book-doctor';
import { Baby } from './baby';

@Entity('users')
export class UserEntity extends WithIdAndTimestamp {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Column({ select: false, nullable: true })
  @Exclude()
  password: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Column({ nullable: true, unique: true, length: 32 })
  @MaxLength(32)
  username: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(14)
  @Column({ nullable: true, length: 14 })
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @IsBoolean()
  @Column({ default: true })
  isActive: boolean;

  @ApiPropertyOptional()
  @IsString()
  @Column({
    default: RoleType.USER,
  })
  role: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  medicalDegree: string;
  @ApiProperty()
  @IsOptional()
  @Column({ nullable: true, type: 'jsonb' })
  rolePermission: unknown | null;

  toJSON() {
    return instanceToPlain(this);
  }

  @ApiProperty()
  // @Column(string, { name: 'medical_degree', nullable: true })


  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[];

  @OneToMany(() => Baby, (babies) => babies.user)
  babies: Baby[];

  @OneToMany(() => BookDoctor, (bookDoctor) => bookDoctor.doctor)
  doctors: BookDoctor[];

  @OneToMany(() => BookDoctor, (bookDoctor) => bookDoctor.user)
  users: BookDoctor[];
}
