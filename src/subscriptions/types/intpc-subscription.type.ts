export type IntpcSubscription = {
	intpcId: string;
	packageId: string;
};

export type UpgradeIntpcSubscription = {
	intpcId: string;
	packageId: string;
	trial: boolean;
	proRate: boolean;
};

export type ResumeIntpcSubscription = {
	intpcId: string;
};

export type DowngradeIntpcSubscription = {
	intpcId: string;
	packageId: string;
};

export type DeactivateIntpcSubscription = {
	intpcId: string;
};

export type CancelIntpcSubscription = {
	intpcId: string;
};
