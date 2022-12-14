import { NotificationsRepositoryInMemory } from '../../../test/repositories/notificationsRepositoryInMemory';
import { SendNotification } from './sendNotification';

const notificationsRepositoryInMemory = new NotificationsRepositoryInMemory();

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(
      notificationsRepositoryInMemory,
    );

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'this is a notification',
      recipientId: 'recipient-id',
    });

    expect(notificationsRepositoryInMemory.notifications).toHaveLength(1);
    expect(notificationsRepositoryInMemory.notifications[0]).toEqual(
      notification,
    );
  });
});
