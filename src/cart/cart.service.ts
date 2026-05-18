import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { AddMenuToCartDto, UpdateCartDto } from "./dto/cart.dto";
import { Order } from "../order/entities/order.entity";
import { OrderService } from "../order/order.service";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly orderService: OrderService,
  ) {}

  async getCartByUser(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({ where: { userId }, relations: ["menu"] });
  }

  async addMenuToCart(userId: number, dto: AddMenuToCartDto): Promise<Cart> {
    const existing = await this.cartRepository.findOne({
      where: { userId, menuId: dto.menuId },
    });
    if (existing) {
      existing.quantity += dto.quantity;
      if (existing.quantity <= 0) {
        await this.cartRepository.remove(existing);
        return null;
      }
      return this.cartRepository.save(existing);
    }
    const cart = this.cartRepository.create({ userId, ...dto });
    return this.cartRepository.save(cart);
  }

  async updateCart(cartId: number, dto: UpdateCartDto): Promise<Cart> {
    const cart = await this.cartRepository.findOne({ where: { cartId } });
    if (!cart) throw new NotFoundException(`Cart item #${cartId} not found`);
    cart.quantity = dto.quantity;
    return this.cartRepository.save(cart);
  }

  async emptyCart(userId: number): Promise<{ message: string }> {
    await this.cartRepository.delete({ userId });
    return { message: `Cart for user #${userId} has been emptied` };
  }

  async calculateTotalCartByUser(userId: number): Promise<{ total: number }> {
    const items = await this.getCartByUser(userId);
    const total = items.reduce(
      (sum, item) => sum + item.menu.menuPrice * item.quantity,
      0,
    );
    return { total };
  }

  async checkout(userId: number, paymentId: number): Promise<Order[]> {
    const cartItems = await this.getCartByUser(userId);
    if (!cartItems.length) throw new BadRequestException("Cart is empty");

    // Hitung total price dari cart
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.menu.menuPrice * item.quantity,
      0,
    );

    // Update totalPrice di payment
    await this.cartRepository.manager.update(
      "payments",
      { paymentId },
      { totalPrice },
    );

    // Buat order dari setiap item cart
    const orders: Order[] = [];
    for (const item of cartItems) {
      const order = await this.orderService.createOrder({
        menuId: item.menuId,
        quantity: item.quantity,
        paymentId: paymentId,
      });
      orders.push(order);
    }

    await this.emptyCart(userId);
    return orders;
  }
}
