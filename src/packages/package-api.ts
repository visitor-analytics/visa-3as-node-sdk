import { HttpClient } from "../http-client";
import { Package } from "./types/package.type";
import { UpdatePackage } from "./types/update-package.type";

export class PackageApi {
  #packageId: string = "";

  constructor(private readonly httpClient: HttpClient) { }

  public setPackageId(packageId: string): PackageApi {
    this.#packageId = packageId;

    return this;
  }

  public async update(updatePackage: UpdatePackage): Promise<Package> {
    const response = await this.httpClient.update<Package>(
      "/v2/3as/packages/" + this.#packageId,
      updatePackage
    );

    return response.getPayload();
  }
}
