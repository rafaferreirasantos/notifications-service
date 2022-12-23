import { Module } from "@nestjs/common";
import { SendNotification } from "@app/use-cases/send-notification";
import { DatabaseModule } from "@infra/database/database.module";
import { NotificationsController } from "./controllers/notifications.controller";
import { CancelNotification } from "@app/use-cases/cancel-notifications";
import { CountRecipientNotifications } from "@app/use-cases/count-recipient-notifications";
import { GetRecipientNotifications } from "@app/use-cases/get-recipient-notifications";
import { ReadNotification } from "@app/use-cases/read-notification";
import { UnreadNotification } from "@app/use-cases/unread-notificaion";

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification
  ]
})
export class HttpModule { }