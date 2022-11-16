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

  async upgrade(
    upgradeSubscription: UpgradeSubscription
  ): Promise<Subscription> {
    await upgradeSubscriptionSchema.validateAsync(upgradeSubscription);

    const response = await this.httpClient.post<Subscription>(
      this.#path + "/upgrade",
      upgradeSubscription
    );

    return response.getPayload();
  }

  async downgrade(
    downgradeSubscription: DowngradeSubscription
  ): Promise<Subscription> {
    await downgradeSubscriptionSchema.validateAsync(downgradeSubscription);

    const response = await this.httpClient.post<Subscription>(
      this.#path + "/downgrade",
      downgradeSubscription
    );

    return response.getPayload();
  }

  async cancel(cancelSubscription: CancelSubscription): Promise<Subscription> {
    await cancelSubscriptionSchema.validateAsync(cancelSubscription);

    const response = await this.httpClient.post<Subscription>(
      this.#path + "/cancel",
      cancelSubscription
    );

    return response.getPayload();
  }

  async resume(resumeSubscription: ResumeSubscription): Promise<Subscription> {
    await resumeSubscriptionSchema.validateAsync(resumeSubscription);

    const response = await this.httpClient.post<Subscription>(
      this.#path + "/resume",
      resumeSubscription
    );

    return response.getPayload();
  }

  async deactivate(
    deactivateSubscription: DeactivateSubscription
  ): Promise<Subscription> {
    await deactivateSubscriptionSchema.validateAsync(deactivateSubscription);

    const response = await this.httpClient.post<Subscription>(
      this.#path + "/deactivate",
      deactivateSubscription
    );

    return response.getPayload();
  }
}
