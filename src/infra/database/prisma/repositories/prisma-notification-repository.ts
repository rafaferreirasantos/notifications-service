import { Injectable } from "@nestjs/common";
import { Notification } from "@app/entities/notification";
import { NotificationsRepository } from "@app/repositories/notifications-repository"
import { PrismaService } from "../prisma.service";
import { PrismaNotificationMapper } from "@infra/database/mappers/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private prisma: PrismaService) { }
  async findById(notificationId: string): Promise<Notification | null> {
    const raw = await this.prisma.notification.findUnique({
      where: {
        id: notificationId
      }
    })
    if (!raw) return null;
    return PrismaNotificationMapper.toDomain(raw)
  }
  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: {
        recipientId: recipientId
      }
    })
    return notifications.map(PrismaNotificationMapper.toDomain)
  }
  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId
      }
    });
    return count;
  }
  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification)
    await this.prisma.notification.create({
      data: raw
    });
  }
  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.update({
      where: {
        id: notification.id
      },
      data: raw
    })
  }
}