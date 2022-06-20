import { HttpClient } from "../http-client";
import { Client } from "./types/client.type";

export class Clients {
  #path: string = "/v2/3as/clients";

  constructor(private readonly client: HttpClient) {}

  async list(): Promise<Client[] | undefined> {
    return this.client.get<Client[] | undefined>(this.#path);
  }

  async getById(clientId: string): Promise<Client | undefined> {
    return this.client.get<Client | undefined>(`${this.#path}/${clientId}`);
  }
}
