import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'channels' })
export class ChannelEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false })
  channelTitle: string;

  @Column({ nullable: false })
  channelDescription: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
