import * as dotenv from 'dotenv';
dotenv.config();

import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { BodyLoginDto, BodyRegisterDto } from './auth.dto';

describe('Auth Service', () => {
  let authService: AuthService;
  let userModelRepository;

  beforeAll(async () => {
    userModelRepository = mockUserModelRepository();
    authService = await initService({ userModelRepository });
  });

  describe('Login', () => {
    const body: BodyLoginDto = { username: 'azickri', password: '123123' };

    it('success', async () => {
      await authService.login(body);
      expect(userModelRepository.findOneBy).toHaveBeenCalledWith({
        username: 'azickri',
      });
    });

    it('error: password not match', async () => {
      body.password = '234234';

      try {
        await authService.login(body);
      } catch (error) {
        expect(error.message).toEqual('password not match');
      }
    });

    it('error: username not found', async () => {
      jest.spyOn(userModelRepository, 'findOneBy').mockResolvedValueOnce(null);

      try {
        await authService.login(body);
      } catch (error) {
        expect(error.message).toEqual('username not found');
      }
    });
  });

  describe('Register', () => {
    const body: BodyRegisterDto = {
      name: 'New User',
      username: 'newuser',
      email: 'newuser@gmail.com',
      password: '123123',
    };

    it('success', async () => {
      jest.spyOn(userModelRepository, 'findOneBy').mockResolvedValueOnce(null);

      const username = body.username;
      await authService.register(body);
      expect(userModelRepository.findOneBy).toHaveBeenCalledWith({ username });
      expect(userModelRepository.save).toHaveBeenCalled();
    });

    it('error: user has registered', async () => {
      try {
        await authService.register(body);
      } catch (error) {
        expect(error.message).toEqual('user has registered');
      }
    });
  });
});

async function initService({ userModelRepository }) {
  const moduleRef = await Test.createTestingModule({
    providers: [AuthService],
  })
    .useMocker((token) => {
      if (token == 'UserModelRepository') return userModelRepository;
    })
    .compile();

  return moduleRef.get<AuthService>(AuthService);
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
    save: jest.fn().mockResolvedValue({
      id: 1,
      name: 'New User',
      username: 'newuser',
      email: 'newuser@gmail.com',
      password: '$2b$10$C7H.bQ9UDzYb38WTJ7KVOustN0hXnQbodwhdwRhxLBhBZIRnrIO0q',
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  };
}
