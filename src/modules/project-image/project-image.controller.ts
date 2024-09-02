import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateProjectImageDto } from './dto/create-project-image.dto';
import { ProjectImageService } from './project-image.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('project-images')
@ApiTags('project-images')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProjectImageController {
  constructor(private readonly projectImageService: ProjectImageService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova imagem para um projeto' })
  @ApiBody({
    type: CreateProjectImageDto,
    description: 'Dados para criação de uma nova imagem de projeto',
  })
  @ApiResponse({
    status: 201,
    description: 'A imagem do projeto foi criada com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  create(@Body() createProjectImageDto: CreateProjectImageDto) {
    return this.projectImageService.create(createProjectImageDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Retorna uma lista de todas as imagens de projetos',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de imagens de projetos retornada com sucesso.',
  })
  findAll() {
    return this.projectImageService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retorna os detalhes de uma imagem de projeto específica',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador da imagem do projeto',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem do projeto encontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagem do projeto não encontrada.',
  })
  findOne(@Param('id') id: string) {
    return this.projectImageService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma imagem de um projeto' })
  @ApiParam({
    name: 'id',
    description: 'Identificador da imagem do projeto',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Imagem do projeto removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagem do projeto não encontrada.',
  })
  remove(@Param('id') id: string) {
    return this.projectImageService.remove(id);
  }
}
