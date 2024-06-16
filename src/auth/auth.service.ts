import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { compareHash } from 'src/utils/handleBcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  async login(
    { email, password }: LoginDto
  ) {
    const user = await this.usersService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException(`User not found ${email}`)

    const isOk = await compareHash(password, user.password)
    if (!isOk) throw new UnauthorizedException(`Password is not correct`)

    return user

  }

}
