import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('generate-token')
  @ApiOperation({ summary: 'Gera um token JWT sem expiração' })
  @ApiQuery({
    name: 'identifier',
    type: String,
    description: 'Identificador único para gerar o token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Token JWT gerado com sucesso.',
    schema: { example: { access_token: 'your_jwt_token_here' } },
  })
  @ApiResponse({ status: 400, description: 'Dados de entrada inválidos.' })
  async generateToken(@Query('identifier') identifier: string) {
    return this.authService.generateTokenWithoutLogin(identifier);
  }
}
