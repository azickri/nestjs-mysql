import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String })
  username: string;

  @Column({ type: String })
  email: string;

  @Column({ type: Number })
  age: number;

  @Column({ type: Boolean, default: true })
  isHuman: boolean;

  @Column({ type: String })
  currentClass: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
