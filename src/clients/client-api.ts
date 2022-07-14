import { HttpClient } from "../http-client";
import { Response } from "../response";
import { Website } from "../websites/types/website.type";

export class ClientApi {
  #baseUrl: string = "";

  constructor(private readonly httpClient: HttpClient) {}

  setClientId(clientExternalId: string): ClientApi {
    if (!clientExternalId) throw new Error("Missing client id");

    this.#baseUrl = "/v2/3as/clients/" + clientExternalId;

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
      throw new Error("Missing base url, use setClientId() before");
    }
  }
}
