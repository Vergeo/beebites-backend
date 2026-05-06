import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TenantsService } from './tenants.service';
import { CreateTenantDto, UpdateTenantDto, UpdateOperationalHoursDto } from './dto/tenant.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Tenants')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @ApiOperation({ summary: 'Get all tenants' })
  @Get()
  getAllTenants() {
    return this.tenantsService.getAllTenants();
  }

  @ApiOperation({ summary: 'Get tenant by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create new tenant' })
  @Post()
  addTenant(@Body() dto: CreateTenantDto) {
    return this.tenantsService.addTenant(dto);
  }

  @ApiOperation({ summary: 'Update tenant' })
  @Put(':id')
  updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.updateTenant(+id, dto);
  }

  @ApiOperation({ summary: 'Delete tenant' })
  @Delete(':id')
  deleteTenant(@Param('id') id: string) {
    return this.tenantsService.deleteTenant(+id);
  }

  @ApiOperation({ summary: 'Update operational hours' })
  @Put(':id/operational-hours')
  updateOperationalHours(@Param('id') id: string, @Body() dto: UpdateOperationalHoursDto) {
    return this.tenantsService.updateOperationalHours(+id, dto);
  }

  @ApiOperation({ summary: 'Check if tenant is open' })
  @Get(':id/is-open')
  checkIfOpen(@Param('id') id: string) {
    return this.tenantsService.checkIfOpen(+id);
  }
}
