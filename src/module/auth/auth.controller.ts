import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BodyLoginDto, BodyRegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: BodyLoginDto) {
    return this.authService.login(body);
  }

  @Post('register')
  register(@Body() body: BodyRegisterDto) {
    return this.authService.register(body);
  }
}
