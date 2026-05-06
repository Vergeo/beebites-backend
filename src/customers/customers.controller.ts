import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CustomersService } from './customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Customers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @ApiOperation({ summary: 'Get customer by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @ApiOperation({ summary: 'Create customer profile' })
  @Post()
  create(@Body() dto: CreateCustomerDto) {
    return this.customersService.create(dto);
  }

  @ApiOperation({ summary: 'Update customer profile' })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.customersService.update(+id, dto);
  }

  @ApiOperation({ summary: 'Delete customer' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(+id);
  }

  @ApiOperation({ summary: 'View all tenants (as customer)' })
  @Get(':id/tenants')
  viewTenants() {
    return this.customersService.viewTenants();
  }

  @ApiOperation({ summary: 'View menu of a tenant' })
  @Get(':id/menu/:tenantId')
  viewMenu(@Param('tenantId') tenantId: string) {
    return this.customersService.viewMenu(+tenantId);
  }

  @ApiOperation({ summary: 'View customer orders' })
  @Get(':id/orders')
  viewOrders(@Param('id') id: string) {
    return this.customersService.viewOrders(+id);
  }

  @ApiOperation({ summary: 'View customer order history' })
  @Get(':id/orders/history')
  viewOrderHistory(@Param('id') id: string) {
    return this.customersService.viewOrderHistory(+id);
  }

  @ApiOperation({ summary: 'Track a specific order' })
  @Get(':id/orders/:orderId/track')
  trackOrder(@Param('orderId') orderId: string) {
    return this.customersService.trackOrder(+orderId);
  }
}
