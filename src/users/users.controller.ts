import { Controller, Get, Post, Put, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get('get-all-users')
  getAllUser() {
    return this.usersService.getAllUser();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @Get('get-user/:userId')
  getUser(@Param('userId') id: string) {
    return this.usersService.getUser(+id);
  }

  @ApiOperation({ summary: 'Create user' })
  @Post('create-user')
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Update user' })
  @Patch('update-user/:userId')
  updateUser(@Param('userId') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(+id, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @Delete('delete-user/:userId')
  deleteUser(@Param('userId') id: string) {
    return this.usersService.deleteUser(+id);
  }
}
