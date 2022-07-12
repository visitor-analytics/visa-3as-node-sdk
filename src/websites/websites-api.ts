import { HttpClient } from "../http-client";
import { Website } from "./types/website.type";
import { Response } from "../response";

export class WebsitesApi {
  // path1: GET /v2/3as/clients/:id/websites

  constructor(private readonly httpClient: HttpClient) {}

  async getById(websiteId: string): Promise<Response<Website | undefined>> {
    return this.httpClient.get<Website | undefined>(
      `/v2/3as/websites/${websiteId}`
    );
  }
}
