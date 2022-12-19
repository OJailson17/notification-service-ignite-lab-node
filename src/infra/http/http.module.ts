import { Module } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification/sendNotificationUseCase';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { ReadNotification } from '@app/useCases/readNotification/readNotificationUseCase';
import { UnreadNotification } from '@app/useCases/unreadNotification/unreadNotificationUseCase';
import { CountRecipientNotifications } from '@app/useCases/countRecipientNotification/countRecipientNotificationUseCase';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotification/getRecipientNotificationUseCase';
import { CancelNotification } from '@app/useCases/cancelnotification/cancelNotificationUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
  ],
})
export class HttpModule {}
