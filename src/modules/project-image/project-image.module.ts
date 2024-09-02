import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectImageController } from './project-image.controller';
import { ProjectImageService } from './project-image.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ProjectImageController],
  providers: [ProjectImageService, PrismaService],
})
export class ProjectImageModule {}
