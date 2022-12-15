import { Notification } from '@app/entities/notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    const { category, content, recipientId, readAt, createdAt, id } =
      notification;

    return {
      id,
      content: content.value,
      category,
      recipientId,
      readAt,
      createdAt,
    };
  }
}
