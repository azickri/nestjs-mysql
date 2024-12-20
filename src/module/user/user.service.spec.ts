import { UserService } from './user.service';
import { Test } from '@nestjs/testing';
import { BodyUpdateUserDto } from './user.dto';
import { User } from '@/type/user.type';

describe('User Service', () => {
  let userService: UserService;
  let userModelRepository;

  const user: User = {
    id: 1,
    username: 'newuser',
    name: 'New User',
    email: 'newuser@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeAll(async () => {
    userModelRepository = mockUserModelRepository();
    userService = await initService({ userModelRepository });
  });

  it('Update User', async () => {
    const body: BodyUpdateUserDto = {
      name: 'Azickri',
      email: 'contact.azickri@gmail.com',
      password: '123123',
    };

    await userService.updateUser(body, user);
    expect(userModelRepository.update).toHaveBeenCalledWith(user.id, {
      ...body,
      password: expect.anything(),
    });
  });

  it('Delete User', async () => {
    await userService.deleteUser(user);
    expect(userModelRepository.delete).toHaveBeenCalledWith(user.id);
  });
});

async function initService({ userModelRepository }) {
  const moduleRef = await Test.createTestingModule({
    providers: [UserService],
  })
    .useMocker((token) => {
      if (token == 'UserModelRepository') return userModelRepository;
    })
    .compile();

  return moduleRef.get<UserService>(UserService);
}

function mockUserModelRepository() {
  return {
    update: jest.fn().mockResolvedValue(null),
    delete: jest.fn().mockResolvedValue(null),
  };
}
