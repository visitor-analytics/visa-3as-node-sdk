import { Client } from "./client";
import { VisaParams } from "./common";
import { Packages } from "./packages/packages";
import { Package } from "./packages/types/package.type";

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
      logLevel: params.logLevel,
      environment: params.environment,
    });
  }

  async packages(): Promise<Package[] | undefined> {
    return this.#packages.all();
  }
}
