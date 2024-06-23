import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { compareHash } from 'src/utils/handleBcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) { }

  async login({ email, password }: LoginDto): Promise<{data: object, token: string }> {

    const user = await this.usersService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException(`User not found ${email}`)

    const isOk = await compareHash(password, user.password)
    if (!isOk) throw new UnauthorizedException(`Authentication is not correct`)

    const payload = {user_id: user.user_id, email: user.email, username: user.name, role: user.role }
    const token = await this.jwtService.signAsync(payload)

    return {
      data: payload,
      token
    }
  }

}
