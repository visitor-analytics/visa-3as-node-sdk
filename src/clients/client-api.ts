import { HttpClient } from "../http-client";
import { Website } from "../websites/types/website.type";

export class ClientApi {
  #baseUrl: string = "";

  constructor(private readonly httpClient: HttpClient) {}

  setClientId(clientId: string): ClientApi {
    if (!clientId) throw new Error("Missing client id");

    this.#baseUrl = "/v2/3as/clients/" + clientId;

    return this;
  }

  async listWebsites() {
    if (!this.#baseUrl) {
      throw new Error("Missing base url");
    }

    return this.httpClient.get<Website[] | undefined>(
      this.#baseUrl + "/websites"
    );
  }
}
