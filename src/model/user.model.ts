import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoModel } from './todo.model';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  username: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  email: string;

  @Column({ type: String })
  password: string;

  @OneToMany(() => TodoModel, (todo) => todo.user)
  todos: TodoModel[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
