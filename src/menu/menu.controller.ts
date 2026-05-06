import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuDto, CreateMenuItemDto, UpdateMenuItemDto } from './dto/menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Menu')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: 'Get menu by tenant' })
  @Get('tenant/:tenantId')
  getMenuByTenant(@Param('tenantId') tenantId: string) {
    return this.menuService.getMenuByTenant(+tenantId);
  }

  @ApiOperation({ summary: 'Create a menu for tenant' })
  @Post()
  createMenu(@Body() dto: CreateMenuDto) {
    return this.menuService.createMenu(dto);
  }

  @ApiOperation({ summary: 'Add menu item' })
  @Post(':menuId/items')
  addMenuItem(@Param('menuId') menuId: string, @Body() dto: CreateMenuItemDto) {
    return this.menuService.addMenuItem(+menuId, dto);
  }

  @ApiOperation({ summary: 'Update menu item' })
  @Put('items/:itemId')
  updateMenuItem(@Param('itemId') itemId: string, @Body() dto: UpdateMenuItemDto) {
    return this.menuService.updateMenuItem(+itemId, dto);
  }

  @ApiOperation({ summary: 'Delete menu item' })
  @Delete('items/:itemId')
  removeMenuItem(@Param('itemId') itemId: string) {
    return this.menuService.removeMenuItem(+itemId);
  }

  @ApiOperation({ summary: 'Update item stock' })
  @Put('items/:itemId/stock')
  updateStock(@Param('itemId') itemId: string, @Body('quantity') quantity: number) {
    return this.menuService.updateStock(+itemId, quantity);
  }
}
