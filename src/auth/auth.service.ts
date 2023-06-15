import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRegisterDTO } from './dto/auth-register.DTO';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private EXPIRATION_TIME = '7 days';
  private ISSUER = 'SafePass';
  private AUDIANCE = 'users';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: AuthRegisterDTO) {
    const user = await this.userService.getByEmail(data.email);
    if (user) throw new ConflictException();
    return await this.userService.create(data);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new UnauthorizedException('Email or password not valid.');

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) throw new UnauthorizedException('Email or password not valid.');

    return this.createToken(user);
  }

  async createToken(user: User) {
    const token = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: this.EXPIRATION_TIME,
        subject: String(user.id),
        issuer: this.ISSUER,
        audience: this.AUDIANCE,
      },
    );

    return {
      token,
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.AUDIANCE,
        issuer: this.ISSUER,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
