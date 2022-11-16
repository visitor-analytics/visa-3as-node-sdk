import { HttpClient } from "./http-client";
import { VisaParams } from "./common";
import { CustomerApi } from "./customers";
import { CustomersApi } from "./customers";
import { WebsiteApi, WebsitesApi } from "./websites";
import { PackagesApi } from "./packages";
import { AuthUtils } from "./common/auth/auth";
import { IFrameUtils } from "./common/iframe";
import { PackageApi } from "./packages/package-api";
import { SubscriptionsApi } from "./noitifications/subscriptions/subscriptions-api";

export class VisitorAnalytics {
  // customers
  #customersApi: CustomersApi;
  #customerApi: CustomerApi;
  // customer packages
  #packageApi: PackageApi;
  #packagesApi: PackagesApi;
  // customer websites;
  #websiteApi: WebsiteApi;
  #websitesApi: WebsitesApi;
  // notifications
  // subscriptions
  #subscriptionApi: SubscriptionsApi;

  public auth: AuthUtils;

  // http
  #httpClient: HttpClient;

  constructor(private readonly params: VisaParams) {
    this.auth = new AuthUtils(params.intp);

    this.#httpClient = new HttpClient({
      accessToken: this.auth.generateINTPAccessToken(),
      env: params.env,
      logLevel: params.logLevel,
    });

    this.#customerApi = new CustomerApi(
      this.#httpClient,
      new IFrameUtils(this.auth, params.env)
    );
    this.#customersApi = new CustomersApi(this.#httpClient);

    this.#websiteApi = new WebsiteApi(this.#httpClient);
    this.#websitesApi = new WebsitesApi(this.#httpClient);

    this.#packageApi = new PackageApi(this.#httpClient);
    this.#packagesApi = new PackagesApi(this.#httpClient);

    this.#subscriptionApi = new SubscriptionsApi(this.#httpClient);
  }

  get customers(): CustomersApi {
    return this.#customersApi;
  }

  customer(externalId: string): CustomerApi {
    return this.#customerApi.setCustomerId(externalId);
  }

  get websites(): WebsitesApi {
    return this.#websitesApi;
  }

  website(externalId: string): WebsiteApi {
    return this.#websiteApi.setWebsiteId(externalId);
  }

  get packages(): PackagesApi {
    return this.#packagesApi;
  }

  package(id: string): PackageApi {
    return this.#packageApi.setPackageId(id);
  }

  get subscriptions(): SubscriptionsApi {
    return this.#subscriptionApi;
  }
}
