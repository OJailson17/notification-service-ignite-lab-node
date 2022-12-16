import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { NotificationsRepositoryInMemory } from '@test/repositories/notificationsRepositoryInMemory';
import { CancelNotification } from './cancelNotification';
import { NotificationNotFound } from './errors/notificationNotFound';

const notificationsRepositoryInMemory = new NotificationsRepositoryInMemory();

describe('Cancel notification', () => {
  it('should be able to cancel a notification', async () => {
    const cancelNotification = new CancelNotification(
      notificationsRepositoryInMemory,
    );

    const notification = new Notification({
      category: 'social',
      content: new Content('New friend request'),
      recipientId: 'recipientId',
    });

    await notificationsRepositoryInMemory.create(notification);

    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationsRepositoryInMemory.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a notification if it does not exist', async () => {
    const cancelNotification = new CancelNotification(
      notificationsRepositoryInMemory,
    );

    expect(() => {
      return cancelNotification.execute({ notificationId: 'wrong-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
