import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ){
    console.log(loginDto);
    return this.authService.login(loginDto)
    // return this.authService.login("","")
  }
}