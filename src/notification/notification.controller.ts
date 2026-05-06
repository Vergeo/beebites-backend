import { Controller, Get, Post, Put, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { SendNotificationDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({ summary: 'Send a notification to a user' })
  @Post()
  sendNotification(@Body() dto: SendNotificationDto) {
    return this.notificationService.sendNotification(dto);
  }

  @ApiOperation({ summary: 'Get all notifications for a user' })
  @Get('user/:userId')
  getNotificationsByUser(@Param('userId') userId: string) {
    return this.notificationService.getNotificationsByUser(+userId);
  }

  @ApiOperation({ summary: 'Get unread notification count for a user' })
  @Get('user/:userId/unread-count')
  getUnreadCount(@Param('userId') userId: string) {
    return this.notificationService.getUnreadCount(+userId);
  }

  @ApiOperation({ summary: 'Mark notification as read' })
  @Put(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationService.markAsRead(+id);
  }
}
