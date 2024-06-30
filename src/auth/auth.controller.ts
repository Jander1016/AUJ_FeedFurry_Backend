import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard/auth.guard';
import RequestWhitUser from './interface/auth.interface';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enum/role.enum';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
@ApiTags("Auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ){}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
  ){
    return this.authService.login(loginDto)
  }

  @Get('profile')
  // @Roles(Role.User)
  // @UseGuards(AuthGuard, RolesGuard)
  @Auth(Role.User)
  profile(
    @Req() 
    req: RequestWhitUser) {
    return  this.authService.profile(req)
  }
  
}