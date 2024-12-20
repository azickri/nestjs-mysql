import { UserGuard } from '@/guard/user.guard';
import { User } from '@/type/user.type';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BodyUpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@ApiTags('User Controller')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  getUser(@Req() { user }: { user: User }) {
    return user;
  }

  @Patch()
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  updateUser(@Body() body: BodyUpdateUserDto, @Req() { user }: { user: User }) {
    return this.userService.updateUser(body, user);
  }

  @Delete()
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  deleteUser(@Req() { user }: { user: User }) {
    return this.userService.deleteUser(user);
  }
}
