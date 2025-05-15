import { PaginatedResponse } from "../common";
import { HttpClient } from "../http-client";
import { CreateIntpc } from "./types/create-intpc.type";
import { Intpc } from "./types/intpc.type";

export class IntpcsApi {
  #path: string = "/v2/3as/intpcs";

  constructor(private readonly httpClient: HttpClient) { }

  async create(createIntpc: CreateIntpc): Promise<Intpc> {
    const response = await this.httpClient.post<Intpc>(
      this.#path,
      createIntpc
    );

    return response.getPayload();
  }

  async list(
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 0, pageSize: 10 }
  ): Promise<PaginatedResponse<Intpc>> {
    const response = await this.httpClient.get<Intpc[]>(
      this.#path +
      "?page=" +
      pagination.page +
      "&pageSize=" +
      pagination.pageSize
    );

    return { items: response.getPayload(), metadata: response.getMetadata() };
  }

  async getByIntpCustomerId(intpCustomerId: string): Promise<Intpc> {
    return (
      await this.httpClient.get<Intpc>(this.#path + "/" + intpCustomerId)
    ).getPayload();
  }
}
