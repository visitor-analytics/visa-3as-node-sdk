import { HttpClient } from "./http-client";
import { VisaParams } from "./common";
import { CustomerApi } from "./customers";
import { CustomersApi } from "./customers";
import { WebsitesApi } from "./websites";
import { PackagesApi } from "./packages";
import { NotificationsApi } from "./notifications";
import { NotificationTypes } from "./notifications";

export class VisitorAnalytics {
  // customers
  #customersApi: CustomersApi;
  #customerApi: CustomerApi;
  // customer packages
  #packagesApi: PackagesApi;
  // customer websites;
  #websitesApi: WebsitesApi;
  // notifications
  #notificationsApi: NotificationsApi;

  // http
  #httpClient: HttpClient;

  constructor(private readonly params: VisaParams) {
    this.#httpClient = this.#setupClient(this.params);

    this.#customerApi = new CustomerApi(this.#httpClient);
    this.#customersApi = new CustomersApi(this.#httpClient);
    this.#websitesApi = new WebsitesApi(this.#httpClient);
    this.#packagesApi = new PackagesApi(this.#httpClient);
    this.#notificationsApi = new NotificationsApi(this.#httpClient);
  }

  #setupClient(params: VisaParams): HttpClient {
    return new HttpClient({
      host: "http://localhost:8080",
      partner: {
        id: params.partner.id,
        domain: params.partner.domain,
        privateKey: params.partner.privateKey,
      },
      environment: params.environment,
      logLevel: params.logLevel,
    });
  }

  get customers(): CustomersApi {
    return this.#customersApi;
  }

  customer(customerId: string): CustomerApi {
    return this.#customerApi.setCustomerId(customerId);
  }

  get websites(): WebsitesApi {
    return this.#websitesApi;
  }

  get packages(): PackagesApi {
    return this.#packagesApi;
  }

  notify(payload: NotificationTypes) {
    return this.#notificationsApi.notify(payload);
  }
}
