import { HttpClient } from "../../http-client";
import { CancelSubscription } from "./types/cancel-subscription.type";
import { DeactivateSubscription } from "./types/deactivate-subscription.type";
import { DowngradeSubscription } from "./types/downgrade-subscription.type";
import { ResumeSubscription } from "./types/resume-subscription.type";
import { Subscription } from "./types/subscription.type";
import { UpgradeSubscription } from "./types/upgrade-subscription.type";

export class SubscriptionsApi {
  #path: string = "/v2/3as/notifications/subscriptions";

  constructor(private readonly httpClient: HttpClient) { }

  async upgrade(upgradeSubscription: UpgradeSubscription): Promise<void> {
    await this.httpClient.post<Subscription>(
      this.#path + "/upgrade",
      upgradeSubscription
    );
  }

  async downgrade(downgradeSubscription: DowngradeSubscription): Promise<void> {
    await this.httpClient.post<Subscription>(
      this.#path + "/downgrade",
      downgradeSubscription
    );
  }

  async cancel(cancelSubscription: CancelSubscription): Promise<void> {
    await this.httpClient.post<Subscription>(
      this.#path + "/cancel",
      cancelSubscription
    );
  }

  async resume(resumeSubscription: ResumeSubscription): Promise<void> {
    await this.httpClient.post<Subscription>(
      this.#path + "/resume",
      resumeSubscription
    );
  }

  async deactivate(
    deactivateSubscription: DeactivateSubscription
  ): Promise<void> {
    await this.httpClient.post<Subscription>(
      this.#path + "/deactivate",
      deactivateSubscription
    );
  }
}
