import { Controller, Get, Post, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/order.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Order")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller("order")
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@ApiOperation({ summary: "Create order" })
	@Post("create-order")
	createOrder(@Body() dto: CreateOrderDto) {
		return this.orderService.createOrder(dto);
	}

	@ApiOperation({ summary: "Get order by ID" })
	@Get("get-order/:orderId")
	getOrder(@Param("orderId") id: string) {
		return this.orderService.getOrder(+id);
	}

	@ApiOperation({ summary: "Delete order" })
	@Delete("delete-order/:orderId")
	deleteOrder(@Param("orderId") id: string) {
		return this.orderService.deleteOrder(+id);
	}
}
