import { Notifications } from "../enums/notifications.enum";

export type NotificationCreated = {
  type: Notifications.SUBSCRIPTION_CREATED;
  payload: {
    packageId: string;
    website: {
      id: string;
      domain: string;
      language?: "en";
      timezone?: string;
    };
    customer: {
      id: string;
      email: string;
    };
  };
};
