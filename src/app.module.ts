import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ProjectImageModule } from './modules/project-image/project-image.module';
import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth.service';

@Module({
  imports: [ProjectModule, ProjectImageModule, AuthModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
