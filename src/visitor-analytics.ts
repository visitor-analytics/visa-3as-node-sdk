import { HttpClient } from "./http-client";
import { VisaParams } from "./common";
import { Packages } from "./packages/packages";
import { Clients } from "./clients/clients";
import { Client } from "./clients/types/client.type";
import { Notifications } from "./notifications";
import { NotificationTypes } from "./notifications/types";

export class VisitorAnalytics {
  // company data
  #packages: Packages;
  // company clients
  #clients: Clients;
  // notifications
  #notifications: Notifications;
  // http
  #httpClient: HttpClient;

  constructor(private readonly params: VisaParams) {
    this.#httpClient = this.#setupClient(this.params);

    this.#packages = new Packages(this.#httpClient);
    this.#clients = new Clients(this.#httpClient);
    this.#notifications = new Notifications(this.#httpClient);
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
}
