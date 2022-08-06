import { ChatEntity } from 'src/chat/entities/chat.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'chat-members' })
export class ChatMembersEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false, default: 'Участник' })
  status: string;

  @ManyToOne(() => UserEntity, { eager: false })
  user: UserEntity;

  @ManyToOne(() => ChatEntity, { eager: true })
  chat: ChatEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
