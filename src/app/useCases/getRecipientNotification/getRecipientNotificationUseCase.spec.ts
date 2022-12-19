import { makeNotification } from '@test/factories/notificationFactory';
import { NotificationsRepositoryInMemory } from '@test/repositories/notificationsRepositoryInMemory';
import { GetRecipientNotifications } from './getRecipientNotificationUseCase';

const notificationsRepositoryInMemory = new NotificationsRepositoryInMemory();

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'recipientId',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipientId' }),
        expect.objectContaining({ recipientId: 'recipientId' }),
      ]),
    );
  });
});
