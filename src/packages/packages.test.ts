import { mock, mockClear } from "jest-mock-extended";
import { PackagesApi } from "./packages-api";
import { HttpClient } from "../http-client";
import { Package } from "./types/package.type";

describe("Packages", () => {
  let packages: PackagesApi;
  let httpClient: HttpClient;
  const packageId = "11eec738-15e1-42af-8fc8-ddf814af5001";
  const companyId = "f5587488-f1e4-41fa-b5ce-660c2b5f7b0f";
  const packagePayload: Package = {
    id: packageId,
    touchpoints: "2",
    companyId,
    createdAt: new Date().toDateString(),
  };

  beforeEach(() => {
    httpClient = mock<HttpClient>();

    packages = new PackagesApi(httpClient);
  });

  afterEach(() => {
    mockClear(httpClient);
  });

  describe("List all packages", () => {
    it("should call axios get when list() is called", async () => {
      await packages.list();
      expect(httpClient.get).toHaveBeenCalled();
    });
  });

  describe("Get package by ID", () => {
    it("should call axios get when getById() is called", async () => {
      packages.getById(packageId);
      expect(httpClient.get).toHaveBeenCalled();
    });
  });

  describe("Update package by ID", () => {
    it("should call axios patch when updateById is called", () => {
      packages.updateById(packageId, packagePayload);
      expect(httpClient.update).toHaveBeenCalled();
    });
  });
});
