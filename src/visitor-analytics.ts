import { HttpClient } from "./http-client";
import { VisaParams } from "./common";
import { PackagesApi } from "./packages/packages-api";
import { ClientsApi } from "./clients/clients-api";
import { NotificationsApi } from "./notifications";
import { NotificationTypes } from "./notifications/types";
import { WebsitesApi } from "./websites";
import { ClientApi } from "./clients";

export class VisitorAnalytics {
  // company data
  #packagesApi: PackagesApi;
  // company clients
  #clients: ClientsApi;

  #clientApi: ClientApi;
  // notifications
  #notificationsApi: NotificationsApi;
  // company websites;
  #websitesApi: WebsitesApi;
  // http
  #httpClient: HttpClient;

  constructor(private readonly params: VisaParams) {
    this.#httpClient = this.#setupClient(this.params);

    this.#packagesApi = new PackagesApi(this.#httpClient);
    this.#clients = new ClientsApi(this.#httpClient);
    this.#clientApi = new ClientApi(this.#httpClient);
    this.#notificationsApi = new NotificationsApi(this.#httpClient);
    this.#httpClient = this.#setupClient(params);
    this.#websitesApi = new WebsitesApi(this.#httpClient);
  }

  #setupClient(params: VisaParams): HttpClient {
    return new HttpClient({
      host: "http://localhost:8080",
      company: {
        id: params.company.id,
        domain: params.company.domain,
        privateKey: params.company.privateKey,
      },
      environment: params.environment,
      logLevel: params.logLevel,
    });
  }

  get packages(): PackagesApi {
    return this.#packagesApi;
  }

  get clients(): ClientsApi {
    return this.#clients;
  }

  notify(payload: NotificationTypes) {
    return this.#notificationsApi.notify(payload);
  }

  client(clientId: string): ClientApi {
    return this.#clientApi.setClientId(clientId);
  }

  get websites(): WebsitesApi {
    return this.#websitesApi;
  }
}
