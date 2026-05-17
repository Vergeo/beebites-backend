import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { CartService } from "./cart.service";
import { AddMenuToCartDto, UpdateCartDto } from "./dto/cart.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Cart")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller("cart")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: "Get cart by user" })
  @Get("get-cart-by-user/:userId")
  getCartByUser(@Param("userId") userId: string) {
    return this.cartService.getCartByUser(+userId);
  }

  @ApiOperation({ summary: "Add menu to cart" })
  @Post("add-menu-to-cart/:userId")
  addMenuToCart(
    @Param("userId") userId: string,
    @Body() dto: AddMenuToCartDto,
  ) {
    return this.cartService.addMenuToCart(+userId, dto);
  }

  @ApiOperation({ summary: "Update cart item quantity" })
  @Patch("update-cart/:cartId")
  updateCart(@Param("cartId") cartId: string, @Body() dto: UpdateCartDto) {
    return this.cartService.updateCart(+cartId, dto);
  }

  @ApiOperation({ summary: "Empty cart by user" })
  @Delete("empty-cart/:userId")
  emptyCart(@Param("userId") userId: string) {
    return this.cartService.emptyCart(+userId);
  }

  @ApiOperation({ summary: "Calculate total cart by user" })
  @Get("calculate-total-price-by-user/:userId")
  calculateTotalCartByUser(@Param("userId") userId: string) {
    return this.cartService.calculateTotalCartByUser(+userId);
  }

  @ApiOperation({ summary: "Checkout cart to orders" })
  @Post("checkout")
  checkout(
    @Body("userId") userId: number,
    @Body("paymentId") paymentId: number,
  ) {
    return this.cartService.checkout(userId, paymentId);
  }
}
