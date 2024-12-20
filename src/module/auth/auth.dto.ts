import { ApiProperty } from '@nestjs/swagger';

export class BodyLoginDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;
}

export class BodyRegisterDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;
}
