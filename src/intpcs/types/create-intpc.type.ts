export type CreateIntpc = {
  intpCustomerId: string;
  email: string;
  website: {
    intpWebsiteId: string;
    domain: string;
    packageId?: string;
    billingDate?: string;
  };
};
