import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './model/user.model';
import { Repository } from 'typeorm';

type ParamAddUser = {
  username: string;
  email: string;
  age: number;
  isHuman: boolean;
  currentClass: string;
};

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async getUsers() {
    return { users: await this.userRepository.find() };
  }

  async getOneUser(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async addUser({ username, email, age, isHuman, currentClass }: ParamAddUser) {
    return await this.userRepository.save({
      username,
      email,
      age,
      isHuman,
      currentClass,
    });
  }

  async updateUser(
    id: number,
    { username, email, age, isHuman, currentClass }: ParamAddUser,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(
        { statusCode: 404, message: 'user not found' },
        404,
      );
    }

    return await this.userRepository.update(id, {
      username,
      email,
      age,
      isHuman,
      currentClass,
    });
  }

  async deleteUser(id: number) {
    return await this.userRepository.delete(id);
  }
}
