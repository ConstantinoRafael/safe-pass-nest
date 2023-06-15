import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.DTO';
import { AuthRegisterDTO } from './dto/auth-register.DTO';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('sign-in')
  async signIn(@Body() body: AuthLoginDTO) {
    const { email, password } = body;
    this.authService.signIn(email, password);
  }

  @Post('sign-up')
  async signUp(@Body() body: AuthRegisterDTO) {
    return this.authService.signUp(body);
  }
}
