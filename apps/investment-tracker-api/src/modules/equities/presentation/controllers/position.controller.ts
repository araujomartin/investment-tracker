import { Controller, Get } from '@nestjs/common';
import { PositionUseCase } from '../../application/use-cases/position-use-case.service';
import { InvestmentPosition } from '../../domain/entities/position.entity';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionUseCases: PositionUseCase) {}

  @Get()
  getUserPositions(/* add @Req if using request object */): Promise<
    InvestmentPosition[]
  > {
    // TODO: Extract userId from token (e.g., via request.user or a custom decorator)
    const userId = '1'; // Replace with actual extraction logic
    return this.positionUseCases.getUserPositions(userId);
  }
}
