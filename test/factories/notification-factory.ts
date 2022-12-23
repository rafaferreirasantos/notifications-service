import { Notification, NotificationProps } from "@app/entities/notification";
import { Content } from "@app/entities/notification-contenxt";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Nova solicitação de amizade'),
    category: 'social',
    recipientId: 'example-recipient',
    ...override
  })
}