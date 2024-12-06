import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { email, password, name, acceptedTerms, role } = body;
    return this.authService.register(email, password, name, acceptedTerms, role);
  }
  


  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }

  @Post('recover')
  async recover(@Body() body: { email: string }) {
    return this.authService.generateRecovery(body.email);
  }

  @Post('reset')
  async reset(@Body() body: { token: string; newPassword: string }) {
    return this.authService.resetPassword(body.token, body.newPassword);
  }
}
