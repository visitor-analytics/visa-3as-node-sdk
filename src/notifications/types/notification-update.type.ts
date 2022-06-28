export type NotificationUpdated = {
  type: "SUBSCRIPTION_UPDATED";
  payload: {
    packageId: string;
    website: {
      id: string;
    };
  };
};
