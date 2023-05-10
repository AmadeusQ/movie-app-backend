import { Body, Controller, Param, Post } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dtos/Register.dto';
import { SignInDto } from 'src/auth/dtos/signIn.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('logout')
  logout(@Param('userId') userId: number) {
    return this.authService.logout(userId);
  }
}
