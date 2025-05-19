import { HttpClient } from "../http-client";
import { WebsiteSubscription, UpgradeWebsiteSubscription, ResumeWebsiteSubscription, DeactivateWebsiteSubscription, CancelWebsiteSubscription, DowngradeWebsiteSubscription } from "./types/website-subscription.type";
import { IntpcSubscription, UpgradeIntpcSubscription, ResumeIntpcSubscription, DeactivateIntpcSubscription, CancelIntpcSubscription, DowngradeIntpcSubscription } from "./types/intpc-subscription.type";

export class WebsiteSubscriptionsApi {
  #path: string = "/v3/3as/website-subscriptions";

  constructor(private readonly httpClient: HttpClient) { }

  async upgrade(upgradeSubscription: UpgradeWebsiteSubscription): Promise<void> {
    await this.httpClient.post<WebsiteSubscription>(
      this.#path + "/upgrade",
      upgradeSubscription
    );
  }

  async downgrade(downgradeSubscription: DowngradeWebsiteSubscription): Promise<void> {
    await this.httpClient.post<WebsiteSubscription>(
      this.#path + "/downgrade",
      downgradeSubscription
    );
  }

  async cancel(cancelSubscription: CancelWebsiteSubscription): Promise<void> {
    await this.httpClient.post<WebsiteSubscription>(
      this.#path + "/cancel",
      cancelSubscription
    );
  }

  async resume(resumeSubscription: ResumeWebsiteSubscription): Promise<void> {
    await this.httpClient.post<WebsiteSubscription>(
      this.#path + "/resume",
      resumeSubscription
    );
  }

  async deactivate(
    deactivateSubscription: DeactivateWebsiteSubscription
  ): Promise<void> {
    await this.httpClient.post<WebsiteSubscription>(
      this.#path + "/deactivate",
      deactivateSubscription
    );
  }
}

export class IntpcSubscriptionsApi {
  #path: string = "/v3/3as/intpc-subscriptions";

  constructor(private readonly httpClient: HttpClient) { }

  async upgrade(upgradeSubscription: UpgradeIntpcSubscription): Promise<void> {
    await this.httpClient.post<IntpcSubscription>(
        this.#path + "/upgrade",
        upgradeSubscription
    );
  }

  async downgrade(downgradeSubscription: DowngradeIntpcSubscription): Promise<void> {
    await this.httpClient.post<IntpcSubscription>(
        this.#path + "/downgrade",
        downgradeSubscription
    );
  }

  async cancel(cancelSubscription: CancelIntpcSubscription): Promise<void> {
    await this.httpClient.post<IntpcSubscription>(
        this.#path + "/cancel",
        cancelSubscription
    );
  }

  async resume(resumeSubscription: ResumeIntpcSubscription): Promise<void> {
    await this.httpClient.post<IntpcSubscription>(
        this.#path + "/resume",
        resumeSubscription
    );
  }

  async deactivate(
      deactivateSubscription: DeactivateIntpcSubscription
  ): Promise<void> {
    await this.httpClient.post<IntpcSubscription>(
        this.#path + "/deactivate",
        deactivateSubscription
    );
  }
}
