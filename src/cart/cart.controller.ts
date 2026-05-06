import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartQuantityDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Get cart by customer' })
  @Get(':customerId')
  getCart(@Param('customerId') customerId: string) {
    return this.cartService.getCart(+customerId);
  }

  @ApiOperation({ summary: 'Add item to cart' })
  @Post(':customerId/items')
  addItem(@Param('customerId') customerId: string, @Body() dto: AddToCartDto) {
    return this.cartService.addItem(+customerId, dto);
  }

  @ApiOperation({ summary: 'Remove item from cart' })
  @Delete(':customerId/items/:itemId')
  removeItem(@Param('customerId') customerId: string, @Param('itemId') itemId: string) {
    return this.cartService.removeItem(+customerId, +itemId);
  }

  @ApiOperation({ summary: 'Update item quantity in cart' })
  @Put(':customerId/items')
  updateQuantity(@Param('customerId') customerId: string, @Body() dto: UpdateCartQuantityDto) {
    return this.cartService.updateQuantity(+customerId, dto);
  }

  @ApiOperation({ summary: 'Calculate cart total' })
  @Get(':customerId/total')
  calculateTotal(@Param('customerId') customerId: string) {
    return this.cartService.calculateTotal(+customerId);
  }

  @ApiOperation({ summary: 'Checkout cart' })
  @Post(':customerId/checkout/:tenantId')
  checkout(@Param('customerId') customerId: string, @Param('tenantId') tenantId: string) {
    return this.cartService.checkout(+customerId, +tenantId);
  }

  @ApiOperation({ summary: 'Clear cart' })
  @Delete(':customerId/clear')
  clearCart(@Param('customerId') customerId: string) {
    return this.cartService.clearCart(+customerId);
  }
}
