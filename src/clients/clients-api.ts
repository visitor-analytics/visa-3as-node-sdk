import { HttpClient } from "../http-client";
import { Response } from "../response";
import { Client } from "./types/client.type";

export class ClientsApi {
  #path: string = "/v2/3as/clients";

  constructor(private readonly httpClient: HttpClient) {}

  async create(client: Client): Promise<Response<Client | undefined>> {
    return this.httpClient.post<Client | undefined>(this.#path, client);
  }

  async list(): Promise<Response<Client[] | undefined>> {
    return this.httpClient.get<Client[] | undefined>(this.#path);
  }

  async getById(
    clientExternalId: string
  ): Promise<Response<Client | undefined>> {
    return this.httpClient.get<Client | undefined>(
      `${this.#path}/${clientExternalId}`
    );
  }

  async deleteById(
    clientExternalId: string
  ): Promise<Response<Client | undefined>> {
    return this.httpClient.delete(`${this.#path}/${clientExternalId}`);
  }
}
