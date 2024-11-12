import { HttpClient } from "../http-client";
import { Website } from "./types/website.type";

export class WebsiteApi {
  #externalWebsiteId: string = "";

  constructor(private readonly httpClient: HttpClient) { }

  public setWebsiteId(externalId: string): WebsiteApi {
    this.#externalWebsiteId = externalId;

    return this;
  }

  public async delete(): Promise<Website> {
    const response = await this.httpClient.delete<Website>(
      `/v2/3as/websites/${this.#externalWebsiteId}`
    );

    return response.getPayload();
  }

  public async addWhitelistedDomain(domain: string): Promise<void> {
    const response = await this.httpClient.post<void>(`/v2/3as/websites/${this.#externalWebsiteId}/whitelisted-domains`, {
      domain
    })

    return response.getPayload();
  }

  public async deleteWhitelistedDomain(domain: string): Promise<void> {
    const encodedDomain = encodeURIComponent(domain)

    const response = await this.httpClient.get<void>(`/v2/3as/websites/${this.#externalWebsiteId}/whitelisted-domains/${encodedDomain}`)

    return response.getPayload();
  }

  public async listWhitelistedDomains(): Promise<string[]> {
    const response = await this.httpClient.get<string[]>(`/v2/3as/websites/${this.#externalWebsiteId}/whitelisted-domains`)

    return response.getPayload();
  }
}
