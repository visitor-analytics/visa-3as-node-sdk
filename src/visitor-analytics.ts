import { Client } from "./client";
import { Packages } from "./packages/packages";
import { Package } from "./packages/types/package.type";

export class VisitorAnalytics {
  // company data
  #packages: Packages;
  // http
  #client: Client;

  constructor(
    private readonly params: {
      company: {
        id: string;
        domain: string;
        privateKey: string;
      };
      environment: "production" | "test";
      logLevel: "silent" | "info" | "error" | "debug";
    }
  ) {
    this.#setupClient(this.params);

    this.#packages = new Packages(this.#client);
  }

  #setupClient(params) {
    this.#client = new Client({
      host: "http://localhost:3000",
      company: {
        id: params.companyId,
        domain: params.domain,
        privateKey: params.companyPrivateKey,
      },
      logLevel: params.logLevel,
      environment: params.environment,
    });
  }

  async packages(): Promise<Package[]> {
    return this.#packages.all();
  }
}
