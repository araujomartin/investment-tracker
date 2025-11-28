import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getData(): { message: string; environment: string; port: string } {
    return {
      message: 'Hello API',
      environment: this.configService.get<string>('NODE_ENV', 'development'),
      port: this.configService.get<string>('PORT', '3000'),
    };
  }
}
