import { SendNotification } from './sendNotification';

describe('Send notification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification();

    const { notification } = await sendNotification.execute({
      category: 'social',
      content: 'this is a notification',
      recipientId: 'recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
