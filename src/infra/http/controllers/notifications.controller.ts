import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/useCases/sendNotification';
import { CreateNotificationBody } from '../dtos/createNotificationBody';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    console.log({ body, notification });

    return {
      notification,
    };
  }
}