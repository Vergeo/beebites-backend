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
import { MenuService } from "./menu.service";
import { CreateMenuDto, UpdateMenuDto } from "./dto/menu.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@ApiTags("Menu")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: "Get all menus from tenant" })
  @Get("get-all-menus-from-tenant/:tenantId")
  getAllMenusFromTenant(@Param("tenantId") tenantId: string) {
    return this.menuService.getAllMenusFromTenant(+tenantId);
  }

  @ApiOperation({ summary: "Get menu by ID" })
  @Get("get-menu/:menuId")
  getMenu(@Param("menuId") id: string) {
    return this.menuService.getMenu(+id);
  }

  @ApiOperation({ summary: "Create menu" })
  @Post("create-menu")
  createMenu(@Body() dto: CreateMenuDto) {
    return this.menuService.createMenu(dto);
  }

  @ApiOperation({ summary: "Update menu" })
  @Patch("update-menu/:menuId")
  updateMenu(@Param("menuId") id: string, @Body() dto: UpdateMenuDto) {
    return this.menuService.updateMenu(+id, dto);
  }

  @ApiOperation({ summary: "Delete menu" })
  @Delete("delete-menu/:menuId")
  deleteMenu(@Param("menuId") id: string) {
    return this.menuService.deleteMenu(+id);
  }

  @ApiOperation({ summary: "Search menus from tenant by keyword" })
  @Get("search-menus-from-tenant/:tenantId/:keyword")
  searchMenusFromTenant(
    @Param("tenantId") tenantId: string,
    @Param("keyword") keyword: string,
  ) {
    return this.menuService.searchMenusFromTenant(+tenantId, keyword);
  }
}
