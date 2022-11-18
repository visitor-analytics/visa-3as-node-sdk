import { HttpClient } from "../../http-client";
import { CancelSubscription } from "./types/cancel-subscription.type";
import { DeactivateSubscription } from "./types/deactivate-subscription.type";
import { DowngradeSubscription } from "./types/downgrade-subscription.type";
import { ResumeSubscription } from "./types/resume-subscription.type";
import { Subscription } from "./types/subscription.type";
import { UpgradeSubscription } from "./types/upgrade-subscription.type";
import { cancelSubscriptionSchema } from "./validation/cancel-subscription.schema";
import { deactivateSubscriptionSchema } from "./validation/deactivate-subscription.schema";
import { downgradeSubscriptionSchema } from "./validation/downgrade-subscription.schema";
import { resumeSubscriptionSchema } from "./validation/resume-subscription.schema";
import { upgradeSubscriptionSchema } from "./validation/upgrade-subscription.schema";

export class SubscriptionsApi {
  #path: string = "/v2/3as/notifications/subscriptions";

  constructor(private readonly httpClient: HttpClient) {}

  async upgrade(upgradeSubscription: UpgradeSubscription): Promise<void> {
    await upgradeSubscriptionSchema.validateAsync(upgradeSubscription);

    await this.httpClient.post<Subscription>(
      this.#path + "/upgrade",
      upgradeSubscription
    );
  }

  async downgrade(downgradeSubscription: DowngradeSubscription): Promise<void> {
    await downgradeSubscriptionSchema.validateAsync(downgradeSubscription);

    await this.httpClient.post<Subscription>(
      this.#path + "/downgrade",
      downgradeSubscription
    );
  }

  async cancel(cancelSubscription: CancelSubscription): Promise<void> {
    await cancelSubscriptionSchema.validateAsync(cancelSubscription);

    await this.httpClient.post<Subscription>(
      this.#path + "/cancel",
      cancelSubscription
    );
  }

  async resume(resumeSubscription: ResumeSubscription): Promise<void> {
    await resumeSubscriptionSchema.validateAsync(resumeSubscription);

    await this.httpClient.post<Subscription>(
      this.#path + "/resume",
      resumeSubscription
    );
  }

  async deactivate(
    deactivateSubscription: DeactivateSubscription
  ): Promise<void> {
    await deactivateSubscriptionSchema.validateAsync(deactivateSubscription);

    await this.httpClient.post<Subscription>(
      this.#path + "/deactivate",
      deactivateSubscription
    );
  }
}
