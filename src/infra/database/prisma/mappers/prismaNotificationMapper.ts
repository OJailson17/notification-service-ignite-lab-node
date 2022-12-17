import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

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

  static toDomain(raw: RawNotification): Notification {
    const {
      id,
      content,
      category,
      recipientId,
      readAt,
      canceledAt,
      createdAt,
    } = raw;

    return new Notification(
      {
        content: new Content(content),
        category,
        recipientId,
        readAt,
        createdAt,
        canceledAt,
      },
      id,
    );
  }
}
