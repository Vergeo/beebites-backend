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
import { TenantsService } from "./tenants.service";
import { CreateTenantDto, UpdateTenantDto } from "./dto/tenant.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Tenants")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller("tenants")
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @ApiOperation({ summary: "Get all tenants" })
  @Get("get-all-tenants")
  getAllTenants() {
    return this.tenantsService.getAllTenants();
  }

  @ApiOperation({ summary: "Get tenant by ID" })
  @Get("get-tenant/:tenantId")
  getTenant(@Param("tenantId") id: string) {
    return this.tenantsService.getTenant(+id);
  }

  @ApiOperation({ summary: "Create tenant" })
  @Post("create-tenant")
  createTenant(@Body() dto: CreateTenantDto) {
    return this.tenantsService.createTenant(dto);
  }

  @ApiOperation({ summary: "Update tenant" })
  @Patch("update-tenant/:tenantId")
  updateTenant(@Param("tenantId") id: string, @Body() dto: UpdateTenantDto) {
    return this.tenantsService.updateTenant(+id, dto);
  }

  @ApiOperation({ summary: "Delete tenant" })
  @Delete("delete-tenant/:tenantId")
  deleteTenant(@Param("tenantId") id: string) {
    return this.tenantsService.deleteTenant(+id);
  }

  @ApiOperation({ summary: "Accept tenant" })
  @Patch("accept-tenant/:tenantId")
  acceptTenant(@Param("tenantId") id: string) {
    return this.tenantsService.acceptTenant(+id);
  }

  @ApiOperation({ summary: "Reject tenant" })
  @Patch("reject-tenant/:tenantId")
  rejectTenant(@Param("tenantId") id: string) {
    return this.tenantsService.rejectTenant(+id);
  }

  @ApiOperation({ summary: "Search tenants by keyword" })
  @Get("search-tenants/:keyword")
  searchTenants(@Param("keyword") keyword: string) {
    return this.tenantsService.searchTenants(keyword);
  }

  @ApiOperation({ summary: "Get tenant by user ID" })
  @Get("get-tenant-by-user/:userId")
  getTenantByUserId(@Param("userId") userId: string) {
    return this.tenantsService.getTenantByUserId(+userId);
  }
}
