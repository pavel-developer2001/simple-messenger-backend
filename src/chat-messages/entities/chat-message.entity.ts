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

@Entity({ name: 'chat-messages' })
export class ChatMessagesEntity {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column({ nullable: false })
  message: string;

  @ManyToOne(() => UserEntity, { eager: true })
  user: UserEntity;

  @ManyToOne(() => ChatEntity, { eager: false })
  chat: ChatEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
