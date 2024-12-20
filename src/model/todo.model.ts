import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user.model';

@Entity('todos')
export class TodoModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  title: string;

  @Column({ type: String })
  value: string;

  @ManyToOne(() => UserModel, (user) => user.todos, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: UserModel;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
