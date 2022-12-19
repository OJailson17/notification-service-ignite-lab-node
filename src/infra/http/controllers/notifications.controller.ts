import { CountRecipientNotifications } from '@app/useCases/countRecipientNotification/countRecipientNotificationUseCase';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotification/getRecipientNotificationUseCase';
import { ReadNotification } from '@app/useCases/readNotification/readNotificationUseCase';
import { UnreadNotification } from '@app/useCases/unreadNotification/unreadNotificationUseCase';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification/sendNotificationUseCase';
import { CreateNotificationBody } from '../dtos/createNotificationBody';
import { NotificationViewModel } from '../viewModels/notificationViewModel';
import { CancelNotification } from '@app/useCases/cancelnotification/cancelNotificationUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map((notification) => {
        return NotificationViewModel.toHTTP(notification);
      }),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
