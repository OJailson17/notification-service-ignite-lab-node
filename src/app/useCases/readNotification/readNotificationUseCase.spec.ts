import { makeNotification } from '@test/factories/notificationFactory';
import { NotificationsRepositoryInMemory } from '@test/repositories/notificationsRepositoryInMemory';
import { NotificationNotFound } from '../errors/notificationNotFound';
import { ReadNotification } from './readNotificationUseCase';

const notificationsRepositoryInMemory = new NotificationsRepositoryInMemory();

describe('Read notification', () => {
  it('should be able to read a notification', async () => {
    const readNotification = new ReadNotification(
      notificationsRepositoryInMemory,
    );

    const notification = makeNotification();

    await notificationsRepositoryInMemory.create(notification);

    await readNotification.execute({ notificationId: notification.id });

    expect(notificationsRepositoryInMemory.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification if it does not exist', async () => {
    const readNotification = new ReadNotification(
      notificationsRepositoryInMemory,
    );

    expect(() => {
      return readNotification.execute({ notificationId: 'wrong-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});
