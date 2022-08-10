import { HttpClient } from "../http-client";
import { Response } from "../response";
import { Website } from "../websites/types/website.type";

export class CustomerApi {
  #baseUrl: string = "";

  constructor(private readonly httpClient: HttpClient) {}

  setCustomerId(customerId: string): CustomerApi {
    if (!customerId) throw new Error("Missing customer id");

    this.#baseUrl = "/v2/3as/customers/" + customerId;

    return this;
  }

  async listWebsites(): Promise<Response<Website[] | undefined>> {
    this.checkIfBaseUrl();

    return this.httpClient.get<Website[] | undefined>(
      this.#baseUrl + "/websites"
    );
  }

  async createWebsite(
    website: Website
  ): Promise<Response<Website | undefined>> {
    this.checkIfBaseUrl();

    return this.httpClient.post<Website | undefined>(
      `${this.#baseUrl}/websites`,
      website
    );
  }

  private checkIfBaseUrl() {
    if (!this.#baseUrl) {
      throw new Error("Missing base url, use setCustomerId() before");
    }
  }
}
