import { HttpClient } from "../http-client";
import { Package } from "./types/package.type";

export class Packages {
  #path: string = "/v2/3as/packages";

  constructor(private readonly client: HttpClient) {}

  async list(): Promise<Package[] | undefined> {
    return this.client.get<Package[] | undefined>(this.#path);
  }

  async getById(packageId: string): Promise<Package | undefined> {
    return this.client.get<Package | undefined>(`${this.#path}/${this.#path}`);
  }
}
