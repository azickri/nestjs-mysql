import { UserModel } from '@/model/user.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyUpdateUserDto } from './user.dto';
import { User } from '@/type/user.type';
import { CryptHelper } from '@/helper/crypt.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async updateUser({ name, email, password }: BodyUpdateUserDto, user: User) {
    const setData: {
      name?: string;
      email?: string;
      password?: string;
    } = {};

    if (name && typeof name == 'string') {
      setData.name = name;
    }

    if (email && typeof email == 'string') {
      setData.email = email;
    }

    if (password && typeof password == 'string') {
      setData.password = await CryptHelper.hashString(password);
    }

    await this.userRepository.update(user.id, setData);
  }

  async deleteUser(user: User) {
    await this.userRepository.delete(user.id);
  }
}
