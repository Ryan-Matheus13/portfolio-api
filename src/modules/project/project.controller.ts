import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
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
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('projects')
@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo projeto' })
  @ApiBody({
    type: CreateProjectDto,
    description: 'Dados para criação de um novo projeto',
  })
  @ApiResponse({
    status: 201,
    description: 'O projeto foi criado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista de todos os projetos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de projetos retornada com sucesso.',
  })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna os detalhes de um projeto específico' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do projeto',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Projeto encontrado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os detalhes de um projeto existente' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do projeto',
    type: String,
  })
  @ApiBody({
    type: UpdateProjectDto,
    description: 'Dados para atualização do projeto',
  })
  @ApiResponse({ status: 200, description: 'Projeto atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado.' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um projeto existente' })
  @ApiParam({
    name: 'id',
    description: 'Identificador do projeto',
    type: String,
  })
  @ApiResponse({ status: 200, description: 'Projeto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Projeto não encontrado.' })
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
