import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create() {}

  async get(id: number) {}

  async getByEmail(email: string) {}

  async getAll() {}

  async delete() {}
}
