import { Test } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { BodyCreateTodoDto, QueryGetTodoDto } from './todo.dto';
import { User } from '@/type/user.type';

describe('Todo Service', () => {
  let todoService: TodoService;
  let todoModelRepository;
  let userModelRepository;

  beforeAll(async () => {
    jest.mock('typeorm', () => {
      return jest.fn().mockImplementation(() => ({
        Brackets: jest.fn(),
        Repository: jest.fn(),
      }));
    });

    todoModelRepository = mockTodoModelRepository();
    userModelRepository = mockUserModelRepository();
    todoService = await initService({
      todoModelRepository,
      userModelRepository,
    });
  });

  it('Get Todo', async () => {
    const user: User = {
      id: 1,
      name: 'Azickri',
      username: 'azickri',
      email: 'contact.azickri@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const query: QueryGetTodoDto = {
      page: 1,
      limit: 20,
      search: 'Hello',
    };

    await todoService.getTodo(query, user);
    expect(todoModelRepository.getCount).toHaveBeenCalled();
    expect(todoModelRepository.getMany).toHaveBeenCalled();
  });

  it('Create Todo', async () => {
    const user: User = {
      id: 1,
      name: 'Azickri',
      username: 'azickri',
      email: 'contact.azickri@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const body: BodyCreateTodoDto = {
      title: 'Todo Two',
      value: 'Value',
    };

    await todoService.createTodo(body, user);
    expect(userModelRepository.findOneBy).toHaveBeenCalled();
    expect(todoModelRepository.save).toHaveBeenCalled();
  });

  describe('Update Todo', () => {
    const id = 1;
    const user: User = {
      id: 1,
      name: 'Azickri',
      username: 'azickri',
      email: 'contact.azickri@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const body: BodyCreateTodoDto = {
      title: 'Todo Title',
      value: 'Value',
    };

    it('success', async () => {
      await todoService.updateTodo(id, body, user);
      expect(todoModelRepository.findOneBy).toHaveBeenCalled();
      expect(todoModelRepository.update).toHaveBeenCalled();
    });

    it('error: todo not found', async () => {
      jest.spyOn(todoModelRepository, 'findOneBy').mockResolvedValueOnce(null);

      try {
        await todoService.updateTodo(id, body, user);
      } catch (error) {
        expect(error.message).toEqual('todo not found');
      }
    });
  });

  describe('Delete Todo', () => {
    const id = 1;
    const user: User = {
      id: 1,
      name: 'Azickri',
      username: 'azickri',
      email: 'contact.azickri@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('success', async () => {
      await todoService.deleteTodo(id, user);
      expect(todoModelRepository.findOneBy).toHaveBeenCalled();
      expect(todoModelRepository.delete).toHaveBeenCalled();
    });

    it('error: todo not found', async () => {
      jest.spyOn(todoModelRepository, 'findOneBy').mockResolvedValueOnce(null);

      try {
        await todoService.deleteTodo(id, user);
      } catch (error) {
        expect(error.message).toEqual('todo not found');
      }
    });
  });
});

async function initService({ todoModelRepository, userModelRepository }) {
  const moduleRef = await Test.createTestingModule({
    providers: [TodoService],
  })
    .useMocker((token) => {
      if (token == 'TodoModelRepository') return todoModelRepository;
      if (token == 'UserModelRepository') return userModelRepository;
    })
    .compile();

  return moduleRef.get<TodoService>(TodoService);
}

function mockTodoModelRepository() {
  return {
    createQueryBuilder: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getCount: jest.fn().mockResolvedValue(100),
    getMany: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: 'Todo One',
        value: 'Value One',
        user: {
          id: 1,
          name: 'Azickri',
          username: 'azickri',
          email: 'contact.azickri@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]),
    findOneBy: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Todo One',
      value: 'Value One',
      user: {
        id: 1,
        name: 'Azickri',
        username: 'azickri',
        email: 'contact.azickri@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    save: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Todo One',
      value: 'Value One',
      user: {
        id: 1,
        name: 'Azickri',
        username: 'azickri',
        email: 'contact.azickri@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    delete: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(null),
  };
}

function mockUserModelRepository() {
  return {
    findOneBy: jest.fn().mockResolvedValue({
      id: 1,
      name: 'Azickri',
      username: 'azickri',
      email: 'contact.azickri@gmail.com',
      password: '$2b$10$C7H.bQ9UDzYb38WTJ7KVOustN0hXnQbodwhdwRhxLBhBZIRnrIO0q',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };
}
