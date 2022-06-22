export type NotificationCreated = {
  type: "SUBSCRIPTION_CREATED";
  payload: {
    packageId: string;
    website: {
      id: string;
      domain: string;
      language?: "en";
      timezone?: string;
    };
    client: {
      id: string;
      email: string;
    };
  };
};
