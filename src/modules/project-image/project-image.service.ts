import { Injectable } from '@nestjs/common';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProjectImageService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectImageDto) {
    return this.prisma.projectImage.create({ data });
  }

  async findAll() {
    return this.prisma.projectImage.findMany();
  }

  async findOne(id: string) {
    return this.prisma.projectImage.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return this.prisma.projectImage.delete({ where: { id } });
  }
}
