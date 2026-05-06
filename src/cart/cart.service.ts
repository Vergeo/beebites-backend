import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { MenuService } from '../menu/menu.service';
import { AddToCartDto, UpdateCartQuantityDto } from './dto/cart.dto';
import { OrdersService } from '../orders/orders.service';
import { Order } from '../orders/entities/order.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly menuService: MenuService,
    private readonly ordersService: OrdersService,
  ) {}

  async getCart(customerId: number): Promise<Cart> {
    let cart = await this.cartRepository.findOne({
      where: { customerId },
      relations: ['items'],
    });
    if (!cart) {
      cart = this.cartRepository.create({ customerId, items: [] });
      await this.cartRepository.save(cart);
    }
    return cart;
  }

  async addItem(customerId: number, dto: AddToCartDto): Promise<Cart> {
    const cart = await this.getCart(customerId);
    const item = await this.menuService.getItemById(dto.itemId);
    if (!item.isAvailable) throw new BadRequestException('Item is not available');
    // Add item multiple times based on quantity
    for (let i = 0; i < dto.quantity; i++) {
      cart.items.push(item);
    }
    cart.calculateTotal();
    return this.cartRepository.save(cart);
  }

  async removeItem(customerId: number, itemId: number): Promise<Cart> {
    const cart = await this.getCart(customerId);
    const idx = cart.items.findIndex((i) => i.itemId === itemId);
    if (idx === -1) throw new NotFoundException(`Item #${itemId} not in cart`);
    cart.items.splice(idx, 1);
    cart.calculateTotal();
    return this.cartRepository.save(cart);
  }

  async updateQuantity(customerId: number, dto: UpdateCartQuantityDto): Promise<Cart> {
    const cart = await this.getCart(customerId);
    const item = await this.menuService.getItemById(dto.itemId);
    // Remove all instances of this item then add new quantity
    cart.items = cart.items.filter((i) => i.itemId !== dto.itemId);
    for (let i = 0; i < dto.quantity; i++) {
      cart.items.push(item);
    }
    cart.calculateTotal();
    return this.cartRepository.save(cart);
  }

  async calculateTotal(customerId: number): Promise<number> {
    const cart = await this.getCart(customerId);
    return cart.calculateTotal();
  }

  async checkout(customerId: number, tenantId: number): Promise<Order> {
    const cart = await this.getCart(customerId);
    if (!cart.items || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }
    const order = await this.ordersService.createOrder({
      customerId,
      tenantId,
      itemIds: cart.items.map((i) => i.itemId),
    });
    // Clear cart after checkout
    cart.items = [];
    cart.totalAmount = 0;
    await this.cartRepository.save(cart);
    return order;
  }

  async clearCart(customerId: number): Promise<Cart> {
    const cart = await this.getCart(customerId);
    cart.items = [];
    cart.totalAmount = 0;
    return this.cartRepository.save(cart);
  }
}
