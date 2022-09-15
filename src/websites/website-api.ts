import { HttpClient } from "../http-client";
import { Website } from "./types/website.type";

export class WebsiteApi {
  #externalWebsiteId: string = "";

  constructor(private readonly httpClient: HttpClient) {}

  public setWebsiteId(externalId: string): WebsiteApi {
    this.#externalWebsiteId = externalId;

    return this;
  }

  public async delete(): Promise<Website> {
    const response = await this.httpClient.delete<Website>(
      "/v2/3as/websites/" + this.#externalWebsiteId
    );

    return response.getPayload();
  }
}
