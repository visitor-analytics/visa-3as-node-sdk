import { HttpClient } from "../http-client";
import { Website } from "./types/website.type";
import { Response } from "../response";

export class WebsitesApi {
  #path = "/v2/3as/websites";

  constructor(private readonly httpClient: HttpClient) {}

  async deleteById(
    websiteExternalId: string
  ): Promise<Response<Website | undefined>> {
    return this.httpClient.delete<Website | undefined>(
      `${this.#path}/${websiteExternalId}`
    );
  }

  async getById(
    websiteExternalId: string
  ): Promise<Response<Website | undefined>> {
    return this.httpClient.get<Website | undefined>(
      `${this.#path}/${websiteExternalId}`
    );
  }

  async list(): Promise<Response<Website[] | undefined>> {
    return this.httpClient.get<Website[] | undefined>(this.#path);
  }
}
