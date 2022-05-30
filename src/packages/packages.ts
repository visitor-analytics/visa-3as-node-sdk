import { Client } from "../client";
import { Package } from "./types/package.type";

export class Packages {
  constructor(private readonly client: Client) {}

  async all(): Promise<Package[] | undefined> {
    return this.client.get<Package[] | undefined>("/v2/packages");
  }
}
