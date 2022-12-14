import { Notification } from '../../src/app/entities/notification';
import { NotificationsRepository } from '../../src/app/repositories/notificationsRepository';

export class NotificationsRepositoryInMemory
  implements NotificationsRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
