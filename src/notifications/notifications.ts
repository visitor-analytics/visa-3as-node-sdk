import { HttpClient } from "../http-client";
import { notificationCreateSchema } from "./schemas/notification-create.schema";
import { NotificationTypes } from "./types";
import { NotificationCreated } from "./types/notification-create.type";

export class Notifications {
  #path: string = "/v2/3as/notifications";

  constructor(private readonly httpClient: HttpClient) {}

  async notify(payload: NotificationTypes) {
    switch (payload.type) {
      case "SUBSCRIPTION_CREATED":
        await notificationCreateSchema.validateAsync(payload);
        return this.httpClient.post<NotificationCreated>(this.#path);
    }
  }
}
