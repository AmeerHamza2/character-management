import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CharacterFilterInput } from './dto/character-filter.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class CharacterService {
  constructor(private prisma: PrismaService) {}

  async findAll(filter?: CharacterFilterInput) {
    const where: Prisma.CharacterWhereInput = {};

    if (filter?.status) {
      where.status = filter.status;
    }

    if (filter?.gender) {
      where.gender = filter.gender;
    }

    if (filter?.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.character.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    return this.prisma.character.findUnique({
      where: { id },
    });
  }
}
