import { makeNotification } from '@test/factories/notificationFactory';
import { NotificationsRepositoryInMemory } from '@test/repositories/notificationsRepositoryInMemory';
import { CountRecipientNotifications } from './countRecipientNotificationUseCase';

const notificationsRepositoryInMemory = new NotificationsRepositoryInMemory();

describe('Count recipient notifications', () => {
  it('should be able count recipient notifications', async () => {
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepositoryInMemory,
    );

    await notificationsRepositoryInMemory.create(
      makeNotification({ recipientId: 'recipientId' }),
    );

    await notificationsRepositoryInMemory.create(
      makeNotification({ recipientId: 'recipientId' }),
    );

    await notificationsRepositoryInMemory.create(
      makeNotification({ recipientId: 'recipientId2' }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipientId',
    });

    expect(count).toEqual(2);
  });
});
