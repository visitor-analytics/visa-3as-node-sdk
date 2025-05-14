import { HttpClient } from "../http-client";
import { Website } from "./types/website.type";
import { PaginatedResponse } from "../common";
import { CreateWebsite } from "./types/create-website.type";

export class WebsitesApi {
  #path = "/v2/3as/websites";

  constructor(private readonly httpClient: HttpClient) { }

  async getByIntpWebsiteId(intpWebsiteId: string): Promise<Website> {
    const response = await this.httpClient.get<Website>(
      this.#path + "/" + intpWebsiteId
    );

    return response.getPayload();
  }

  async list(
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 0, pageSize: 10 }
  ): Promise<PaginatedResponse<Website>> {
    const response = await this.httpClient.get<Website[]>(
      this.#path +
      "?page=" +
      pagination.page +
      "&pageSize=" +
      pagination.pageSize
    );

    return {
      items: response.getPayload(),
      metadata: response.getMetadata(),
    };
  }

  async create(createWebsite: CreateWebsite): Promise<Website> {
    const response = await this.httpClient.post<Website>(
      "/v3/3as/websites",
      createWebsite
    );

    return response.getPayload();
  }
}
