import { HttpClient } from "../http-client";
import { Response } from "../response";
import { Package } from "./types/package.type";

export class PackagesApi {
  #path: string = "/v2/3as/packages";

  constructor(private readonly httpClient: HttpClient) {}

  async list(): Promise<Response<Package[] | undefined>> {
    return this.httpClient.get<Package[] | undefined>(this.#path);
  }

  async getById(packageId: string): Promise<Response<Package | undefined>> {
    return this.httpClient.get<Package | undefined>(
      `${this.#path}/${packageId}`
    );
  }

  async updateById(
    packageId: string,
    payload: Package
  ): Promise<Response<Package | undefined>> {
    return this.httpClient.update<Package | undefined>(
      `${this.#path}/${packageId}`,
      payload
    );
  }
}
