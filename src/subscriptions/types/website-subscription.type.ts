export type WebsiteSubscription = {
  intpWebsiteId: string;
  packageId: string;
};

export type UpgradeWebsiteSubscription = {
  intpWebsiteId: string;
  packageId: string;
  trial: boolean;
  proRate: boolean;
};

export type ResumeWebsiteSubscription = {
  intpWebsiteId: string;
};

export type DowngradeWebsiteSubscription = {
  intpWebsiteId: string;
  packageId: string;
};

export type DeactivateWebsiteSubscription = {
  intpWebsiteId: string;
};

export type CancelWebsiteSubscription = {
  intpWebsiteId: string;
};
