import { HttpClient } from "./http-client";
import { VisaParams } from "./common";
import { Packages } from "./packages";
import { Clients } from "./clients";
import { Websites } from "./websites";
import { Client } from "./clients";

export class VisitorAnalytics {
  // company data
  #packages: Packages;
  // company clients
  #clients: Clients;
  // company websites;
  #websites: Websites;
  // client
  #client: Client;
  // http
  #httpClient: HttpClient;

  constructor(private readonly params: VisaParams) {
    this.#httpClient = this.#setupClient(this.params);

    this.#packages = new Packages(this.#httpClient);
    this.#clients = new Clients(this.#httpClient);
    this.#client = new Client(this.#httpClient);
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

  client(clientId: string) {
    return this.#client.setClientId(clientId);
  }

  get websites(): Websites {
    return this.#websites;
  }
}
