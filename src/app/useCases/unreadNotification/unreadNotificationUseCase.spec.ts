import { makeNotification } from '@test/factories/notificationFactory';
import { NotificationsRepositoryInMemory } from '@test/repositories/notificationsRepositoryInMemory';
import { NotificationNotFound } from '../errors/notificationNotFound';
import { UnreadNotification } from './unreadNotificationUseCase';

const notificationsRepositoryInMemory = new NotificationsRepositoryInMemory();

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const unreadNotification = new UnreadNotification(
      notificationsRepositoryInMemory,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepositoryInMemory.create(notification);

    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationsRepositoryInMemory.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a notification if it does not exist', async () => {
    const unreadNotification = new UnreadNotification(
      notificationsRepositoryInMemory,
    );

    expect(() => {
      return unreadNotification.execute({ notificationId: 'wrong-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
