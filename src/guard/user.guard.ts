import { CryptHelper } from '@/helper/crypt.helper';
import { UserModel } from '@/model/user.model';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    @InjectRepository(UserModel) private userRepository: Repository<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { headers } = context.switchToHttp().getRequest<Request>();

    const token = headers.token;
    if (!token) {
      throw new HttpException(
        { statusCode: 401, message: 'unauthorized' },
        401,
      );
    }

    const id = CryptHelper.decryptString(String(token));
    const user = await this.userRepository.findOneBy({ id: Number(id) });
    if (!user) {
      throw new HttpException(
        { statusCode: 401, message: 'unauthorized' },
        401,
      );
    }

    context.switchToHttp().getRequest().user = user;

    return true;
  }
}
