import { HttpClient } from "./http-client";
import { VisaParams } from "./common";
import { Packages } from "./packages/packages";
import { Clients } from "./clients/clients";
import { Notifications } from "./notifications";
import { NotificationTypes } from "./notifications/types";
import { Websites } from "./websites";
import { ClientApi } from "./clients";

export class VisitorAnalytics {
  // company data
  #packages: Packages;
  // company clients
  #clients: Clients;

  #clientApi: ClientApi;
  // notifications
  #notifications: Notifications;
  // company websites;
  #websites: Websites;
  // http
  #httpClient: HttpClient;

  constructor(private readonly params: VisaParams) {
    this.#httpClient = this.#setupClient(this.params);

    this.#packages = new Packages(this.#httpClient);
    this.#clients = new Clients(this.#httpClient);
    this.#clientApi = new ClientApi(this.#httpClient);
    this.#notifications = new Notifications(this.#httpClient);
    this.#httpClient = this.#setupClient(params);
    this.#websites = new Websites(this.#httpClient);
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

  get packages(): Packages {
    return this.#packages;
  }

  get clients(): Clients {
    return this.#clients;
  }

  notify(payload: NotificationTypes) {
    return this.#notifications.notify(payload);
  }

  client(clientId: string) {
    return this.#clientApi.setClientId(clientId);
  }

  get websites(): Websites {
    return this.#websites;
  }
}
