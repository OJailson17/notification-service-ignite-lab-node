import { Module } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/useCases/cancelNotification';
import { ReadNotification } from '@app/useCases/readNotification';
import { UnreadNotification } from '@app/useCases/unreadNotification';
import { CountRecipientNotifications } from '@app/useCases/countRecipientNotification';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotifications';

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
