import { HttpClient } from "../http-client";
import { Package } from "./types/package.type";

export class PackagesApi {
  #path: string = "/v2/3as/packages";

  constructor(private readonly httpClient: HttpClient) {}

  async list(): Promise<Package[]> {
    const response = await this.httpClient.get<Package[]>(this.#path);

    return response.getPayload();
  }

  async getById(packageId: string): Promise<Package> {
    const response = await this.httpClient.get<Package>(
      this.#path + "/" + packageId
    );

    return response.getPayload();
  }

  async create(payload: Package): Promise<Package> {
    const response = await this.httpClient.post<Package>(this.#path, payload);

    return response.getPayload();
  }
}
