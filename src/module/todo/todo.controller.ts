import { UserGuard } from '@/guard/user.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { BodyCreateTodoDto, ParamIdDto, QueryGetTodoDto } from './todo.dto';
import { User } from '@/type/user.type';
import { TodoService } from './todo.service';

@ApiTags('Todo Controller')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  getTodo(@Query() query: QueryGetTodoDto, @Req() { user }: { user: User }) {
    return this.todoService.getTodo(query, user);
  }

  @Post()
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  createTodo(@Body() body: BodyCreateTodoDto, @Req() { user }: { user: User }) {
    return this.todoService.createTodo(body, user);
  }

  @Put(':id')
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  updateTodo(
    @Param() { id }: ParamIdDto,
    @Body() body: BodyCreateTodoDto,
    @Req() { user }: { user: User },
  ) {
    return this.todoService.updateTodo(id, body, user);
  }

  @Delete(':id')
  @ApiHeader({ name: 'token' })
  @UseGuards(UserGuard)
  deleteTodo(@Param() { id }: ParamIdDto, @Req() { user }: { user: User }) {
    return this.todoService.deleteTodo(id, user);
  }
}
