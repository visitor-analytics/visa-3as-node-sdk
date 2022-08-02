import { Notifications } from "../enums/notifications.enum";

export type NotificationUpdated = {
  type: Notifications.SUBSCRIPTION_UPDATED;
  payload: {
    packageId: string;
    website: {
      id: string;
    };
  };
};
