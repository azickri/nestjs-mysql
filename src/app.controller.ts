import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiProperty } from '@nestjs/swagger';

class ParamIdDto {
  @ApiProperty({ type: Number })
  id: number;
}

class BodyAddDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: Number })
  age: number;

  @ApiProperty({ type: Boolean })
  isHuman: boolean;

  @ApiProperty({ type: String })
  currentClass: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Get(':id')
  getOneUser(@Param() { id }: ParamIdDto) {
    return this.appService.getOneUser(Number(id));
  }

  @Post()
  addUser(@Body() { username, email, age, isHuman, currentClass }: BodyAddDto) {
    return this.appService.addUser({
      username,
      email,
      age,
      isHuman,
      currentClass,
    });
  }

  @Put(':id')
  updateUser(
    @Param() { id }: ParamIdDto,
    @Body() { username, email, age, isHuman, currentClass }: BodyAddDto,
  ) {
    return this.appService.updateUser(id, {
      username,
      email,
      age,
      isHuman,
      currentClass,
    });
  }

  @Delete(':id')
  deleteUser(@Param() { id }: ParamIdDto) {
    return this.appService.deleteUser(id);
  }
}
