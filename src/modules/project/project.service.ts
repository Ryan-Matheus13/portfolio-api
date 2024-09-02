import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        ...data,
        photos: {
          create: data.photos?.map((url) => ({ url })) || [],
        },
      },
    });
  }

  async findAll() {
    return this.prisma.project.findMany({
      include: { photos: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: { photos: true },
    });
  }

  async update(id: string, data: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        photos: {
          create: data.photos?.map((url) => ({ url })) || [],
        },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
