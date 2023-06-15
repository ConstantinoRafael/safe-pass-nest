import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create() {}

  async get(id: number) {}

  async getByEmail(email: string) {}

  async getAll() {}

  async delete() {}
}
