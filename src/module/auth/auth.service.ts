import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyLoginDto, BodyRegisterDto } from './auth.dto';
import { UserModel } from '@/model/user.model';
import { CryptHelper } from '@/helper/crypt.helper';
import { ObjectHelper } from '@/helper/object.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async login({ username, password }: BodyLoginDto) {
    const currentUser = await this.userRepository.findOneBy({ username });
    if (!currentUser) {
      throw new HttpException(
        { statusCode: 404, message: 'username not found' },
        404,
      );
    }

    const user = ObjectHelper.copy(currentUser);
    const isMatch = await CryptHelper.compareString(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        { statusCode: 401, message: 'password not match' },
        401,
      );
    }

    delete user.password;
    return {
      ...user,
      token: CryptHelper.encryptString(String(user.id)),
    };
  }

  async register({ name, username, email, password }: BodyRegisterDto) {
    const currentUser = await this.userRepository.findOneBy({ username });
    if (currentUser) {
      throw new HttpException(
        { statusCode: 400, message: 'user has registered' },
        400,
      );
    }

    const newUser = await this.userRepository.save({
      name,
      username,
      email,
      password: await CryptHelper.hashString(password),
    });

    delete newUser.password;
    return {
      ...newUser,
      token: CryptHelper.encryptString(String(newUser.id)),
    };
  }
}
