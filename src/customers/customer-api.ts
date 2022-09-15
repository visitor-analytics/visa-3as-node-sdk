import { PaginatedResponse } from "../common";
import { IFrameUtils } from "../common/iframe";
import { HttpClient } from "../http-client";
import { Website } from "../websites/types/website.type";

export class CustomerApi {
  #customerId: string = "";

  constructor(
    private readonly httpClient: HttpClient,
    private readonly iframe: IFrameUtils
  ) {}

  setCustomerId(customerId: string): CustomerApi {
    if (!customerId) throw new Error("Missing customer id");

    this.#customerId = customerId;

    return this;
  }

  async listWebsites(
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 0, pageSize: 10 }
  ): Promise<PaginatedResponse<Website>> {
    const response = await this.httpClient.get<Website[]>(
      "/v2/3as/websites?externalCustomerId=" +
        this.#customerId +
        "&page=" +
        pagination.page +
        "&pageSize=" +
        pagination.pageSize
    );

    return {
      items: response.getPayload(),
      metadata: response.getMetadata(),
    };
  }

  async delete(): Promise<Website> {
    const response = await this.httpClient.delete<Website>(
      "/v2/3as/customers/" + this.#customerId
    );

    return response.getPayload();
  }

  generateIFrameDashboardUrl(intpcWebsiteId: string): string {
    return this.iframe.generateDashboardUrl(this.#customerId, intpcWebsiteId);
  }
}
