import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokenWithoutLogin(identifier: string): { access_token: string } {
    const payload = { identifier };
    return {
      access_token: this.jwtService.sign(payload), // Sem expiresIn, o token não expira
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token); // Verifica o token sem expiração
    } catch (e) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
