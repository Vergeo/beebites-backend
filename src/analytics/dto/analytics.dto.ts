import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateReportDto {
  @ApiProperty()
  @IsNumber()
  tenantId: number;

  @ApiProperty({ example: '2025-Q1' })
  @IsString()
  period: string;
}
