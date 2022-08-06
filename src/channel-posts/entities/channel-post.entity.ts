import { ChannelEntity } from 'src/channel/entities/channel.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'channel-posts' })
export class ChannelPostsEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false, length: 5000 })
  post: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToOne(() => ChannelEntity, { eager: true })
  channel: ChannelEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
