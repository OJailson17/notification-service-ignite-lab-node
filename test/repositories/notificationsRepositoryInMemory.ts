import { Notification } from '@app/entities/notification';
import { NotificationsRepository } from '@app/repositories/notificationsRepository';

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
