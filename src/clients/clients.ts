import { HttpClient } from "../http-client";
import { Client } from "./types/client.type";

export class Clients {
  #path: string = "/v2/3as/clients";

  constructor(private readonly httpClient: HttpClient) {}

  async list(): Promise<Client[] | undefined> {
    return this.httpClient.get<Client[] | undefined>(this.#path);
  }

  async getById(clientId: string): Promise<Client | undefined> {
    return this.httpClient.get<Client | undefined>(`${this.#path}/${clientId}`);
  }
}
