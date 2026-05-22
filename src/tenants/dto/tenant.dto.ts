import { IsString, IsOptional, IsNumber } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateTenantDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsString()
  tenantName: string;

  @ApiProperty({ required: false })	
  @IsString()
  @IsOptional()
  tenantDescription?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  tenantLogo?: string;

  @ApiProperty({ required: false, example: "08:00" })
  @IsString()
  @IsOptional()
  tenantOpenTime?: string;

  @ApiProperty({ required: false, example: "22:00" })
  @IsString()
  @IsOptional()
  tenantCloseTime?: string;

  @ApiProperty({ required: false, example: "22:00" })
  @IsString()
  @IsOptional()
  status?: string;
}

export class UpdateTenantDto extends PartialType(CreateTenantDto) {}
