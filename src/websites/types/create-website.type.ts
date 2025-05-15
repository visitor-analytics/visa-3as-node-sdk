export type CreateWebsite = {
  website: {
    id: string
    domain: string;
    package?: {
      id: string
      billingDate?: string
    }
  };
  intpc: {
    id: string
  };
  opts?: {
    uft: boolean
  }
};
