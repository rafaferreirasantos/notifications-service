import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository"
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "@infra/database/mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) { }
  findById(notificationId: string): Promise<Notification | null> {
    throw new Error("Method not implemented.");
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data: raw
    });
  }
  save(notification: Notification): Promise<void> {
    throw new Error("Method not implemented.");
  }
  countManyByRecipientId(recipientId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }
}