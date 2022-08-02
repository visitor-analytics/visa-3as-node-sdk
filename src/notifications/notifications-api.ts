import { HttpClient } from "../http-client";
import { notificationCreateSchema } from "./schemas/notification-create.schema";
import { NotificationCreated } from "./types/notification-create.type";
import { notificationUpdateSchema } from "./schemas/notification-update.schema";
import { NotificationUpdated } from "./types/notification-update.type";
import { NotificationTypes } from "./types";
import { Notifications } from "./enums/notifications.enum";

export class NotificationsApi {
  #path: string = "/v2/3as/notifications";

  constructor(private readonly httpClient: HttpClient) {}

  async notify(payload: NotificationTypes) {
    switch (payload.type) {
      case Notifications.SUBSCRIPTION_CREATED:
        await notificationCreateSchema.validateAsync(payload);
        return this.httpClient.post<NotificationCreated>(this.#path);

      case Notifications.SUBSCRIPTION_UPDATED:
        await notificationUpdateSchema.validateAsync(payload);
        return this.httpClient.post<NotificationUpdated>(this.#path);
    }
  }
}
