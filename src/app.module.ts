import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './model/user.model';
import { AuthController } from './module/auth/auth.controller';
import { AuthService } from './module/auth/auth.service';
import { UserController } from './module/user/user.controller';
import { UserService } from './module/user/user.service';
import { TodoController } from './module/todo/todo.controller';
import { TodoService } from './module/todo/todo.service';
import { TodoModel } from './model/todo.model';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DB,
      synchronize: true,
      dropSchema: false,
      logging: true,
      entities: ['dist/**/*.model.js'],
    }),
    TypeOrmModule.forFeature([UserModel, TodoModel]),
  ],
  controllers: [AuthController, UserController, TodoController],
  providers: [AuthService, UserService, TodoService],
})
export class AppModule {}
