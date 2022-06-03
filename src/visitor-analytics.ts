import { Client } from "./client";
import { VisaParams } from "./common";
import { Packages } from "./packages/packages";

export class VisitorAnalytics {
  // company data
  #packages: Packages;
  // http
  #client: Client;

  constructor(private readonly params: VisaParams) {
    this.#client = this.#setupClient(this.params);

    this.#packages = new Packages(this.#client);
  }

  #setupClient(params: VisaParams): Client {
    return new Client({
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
}
