import { IsNumber, IsString, IsIn, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
	@ApiProperty()
	@IsNumber()
	userId: number;

	@ApiProperty()
	@IsNumber()
	tenantId: number;

	@ApiProperty({ enum: ["qris", "cash", "transfer"], example: "qris" })
	@IsString()
	@IsIn(["qris", "cash", "transfer"])
	paymentType: string;

	@ApiProperty({ default: 0 })
	@IsNumber()
	@IsOptional()
	totalPrice?: number;
}
