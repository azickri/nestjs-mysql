import { ApiProperty } from '@nestjs/swagger';

export class QueryGetTodoDto {
  @ApiProperty({ type: Number })
  page: number;

  @ApiProperty({ type: Number })
  limit: number;

  @ApiProperty({ type: String, required: false })
  search?: string;
}

export class BodyCreateTodoDto {
  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  value: string;
}

export class ParamIdDto {
  @ApiProperty({ type: Number })
  id: number;
}
