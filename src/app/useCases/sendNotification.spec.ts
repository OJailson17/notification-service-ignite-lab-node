import { Notification } from '../entities/notification';
import { SendNotification } from './sendNotification';

const notifications: Notification[] = [];

const notificationsRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepository);

    await sendNotification.execute({
      category: 'social',
      content: 'this is a notification',
      recipientId: 'recipient-id',
    });

    console.log(notifications);

    expect(notifications).toHaveLength(1);
  });
});
