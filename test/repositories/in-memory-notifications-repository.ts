import { Injectable } from "@nestjs/common";
import { Notification } from "src/app/entities/notification";
import { NotificationsRepository as NotificationsRepository } from "src/app/repositories/notifications-repository";

@Injectable()
export class InMemoryNotificationsRepostiroy implements NotificationsRepository {
  public notifications: Notification[] = [];
  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}