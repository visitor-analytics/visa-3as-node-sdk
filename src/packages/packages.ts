import { Client } from "../client";
import { PackageWhere } from "./types/package-where.type";
import { Package } from "./types/package.type";

export class Packages {
  constructor(private readonly client: Client) {}

  async get(where?: PackageWhere): Promise<Package[] | undefined> {
    let path = "/v2/3as/packages";

    if (where?.id) {
      path = path + "/" + where.id;
    }

    return this.client.get<Package[] | undefined>(path);
  }
}
