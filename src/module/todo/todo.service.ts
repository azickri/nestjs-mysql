import { TodoModel } from '@/model/todo.model';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { BodyCreateTodoDto, QueryGetTodoDto } from './todo.dto';
import { User } from '@/type/user.type';
import { UserModel } from '@/model/user.model';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoModel)
    private todoRepository: Repository<TodoModel>,
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async getTodo(query: QueryGetTodoDto, user: User) {
    const qb = this.todoRepository
      .createQueryBuilder('todo')
      .where(`todo.user.id = ${user.id}`);

    if (query.search) {
      const filter = { search: `%${query.search}%` };

      qb.andWhere(
        new Brackets((query) => {
          query
            .where(`LOWER(todo.title) LIKE LOWER(:search)`, filter)
            .orWhere(`LOWER(todo.value) LIKE LOWER(:search)`, filter);
        }),
      );
    }

    const page = Number(query.page);
    const limit = Number(query.limit);
    const skip = (page - 1) * limit;

    const [docs, totalDocs] = await Promise.all([
      qb.skip(skip).take(limit).orderBy('todo.createdAt', 'DESC').getMany(),
      qb.getCount(),
    ]);

    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = page < totalPages;

    return {
      docs,
      totalDocs,
      totalPages: Math.ceil(totalDocs / limit),
      hasNextPage,
    };
  }

  async createTodo(body: BodyCreateTodoDto, user: User) {
    const currentUser = await this.userRepository.findOneBy({ id: user.id });
    const newTodo = await this.todoRepository.save({
      title: body.title,
      value: body.value,
      user: currentUser,
    });

    delete newTodo.user.password;
    return newTodo;
  }

  async updateTodo(id: number, body: BodyCreateTodoDto, user: User) {
    const todo = await this.todoRepository.findOneBy({
      id: Number(id),
      user: { id: user.id },
    });

    if (!todo) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    await this.todoRepository.update(todo.id, {
      title: body.title,
      value: body.value,
    });
  }

  async deleteTodo(id: number, user: User) {
    const todo = await this.todoRepository.findOneBy({
      id: Number(id),
      user: { id: user.id },
    });

    if (!todo) {
      throw new HttpException(
        { statusCode: 404, message: 'todo not found' },
        404,
      );
    }

    await this.todoRepository.delete(todo.id);
  }
}
