import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { GenerateReportDto } from './dto/analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @ApiOperation({ summary: 'Generate analytics report for a tenant' })
  @Post('report')
  generateReport(@Body() dto: GenerateReportDto) {
    return this.analyticsService.generateReport(dto);
  }

  @ApiOperation({ summary: 'Get all reports for a tenant' })
  @Get('reports/:tenantId')
  getReportsByTenant(@Param('tenantId') tenantId: string) {
    return this.analyticsService.getReportsByTenant(+tenantId);
  }

  @ApiOperation({ summary: 'Get order summary for a tenant' })
  @Get('summary/:tenantId')
  getOrderSummary(@Param('tenantId') tenantId: string) {
    return this.analyticsService.getOrderSummary(+tenantId);
  }

  @ApiOperation({ summary: 'Get top selling items for a tenant' })
  @Get('top-items/:tenantId')
  getTopItems(@Param('tenantId') tenantId: string) {
    return this.analyticsService.getTopItems(+tenantId);
  }
}
