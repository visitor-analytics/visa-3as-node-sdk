import { HttpClient } from "../http-client";
import { Package } from "./types/package.type";

export class PackagesApi {
  #path: string = "/v2/3as/packages";

  constructor(private readonly httpClient: HttpClient) {}

  async list(): Promise<Package[] | undefined> {
    return this.httpClient.get<Package[] | undefined>(this.#path);
  }

  async getById(packageId: string): Promise<Package | undefined> {
    return this.httpClient.get<Package | undefined>(
      `${this.#path}/${packageId}`
    );
  }

  async updateById(
    packageId: string,
    payload: Package
  ): Promise<Package | undefined> {
    return this.httpClient.update<Package | undefined>(
      `${this.#path}/${packageId}`,
      payload
    );
  }
}
