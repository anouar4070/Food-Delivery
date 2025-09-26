import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { PrismaService } from '../../../prisma/Prisma.service';

import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    // private readonly usersRepository: UsersRepository
    private readonly configService: ConfigService,
  ) {}

  // register user service
  async register(registerDto: RegisterDto, response: Response) {
    const { name, email, password } = registerDto;
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return { user, response };
  }

  // Login service
  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = { email, password };
    return user;
  }

  // get all users service
  async getUsers() {
    return this.prisma.user.findMany({});
  }
}
