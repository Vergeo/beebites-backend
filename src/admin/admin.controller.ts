import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateTenantDto, UpdateTenantDto } from '../tenants/dto/tenant.dto';
import { UpdateMenuItemDto } from '../menu/dto/menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Get all tenants (Admin)' })
  @Get('tenants')
  getAllTenants() {
    return this.adminService.getAllTenants();
  }

  @ApiOperation({ summary: 'Add tenant (Admin)' })
  @Post('tenants')
  addTenant(@Body() dto: CreateTenantDto) {
    return this.adminService.addTenant(dto);
  }

  @ApiOperation({ summary: 'Update tenant (Admin)' })
  @Put('tenants/:id')
  updateTenant(@Param('id') id: string, @Body() dto: UpdateTenantDto) {
    return this.adminService.updateTenant(+id, dto);
  }

  @ApiOperation({ summary: 'Delete tenant (Admin)' })
  @Delete('tenants/:id')
  deleteTenant(@Param('id') id: string) {
    return this.adminService.deleteTenant(+id);
  }

  @ApiOperation({ summary: 'Manage menu item (Admin)' })
  @Put('menu-items/:itemId')
  manageMenuItem(@Param('itemId') itemId: string, @Body() dto: UpdateMenuItemDto) {
    return this.adminService.manageMenuItem(+itemId, dto);
  }
}
