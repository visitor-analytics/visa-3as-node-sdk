import { mock, mockClear } from "jest-mock-extended";
import { PackagesApi } from "./packages-api";
import { HttpClient } from "../http-client";
import { Package } from "./types/package.type";

describe("Packages", () => {
  let packages: PackagesApi;
  let httpClient: HttpClient;
  const packageId = "11eec738-15e1-42af-8fc8-ddf814af5001";
  const packagePayload: Package = {
    id: packageId,
    intpId: "abc",
    name: "free",
    price: 0.0,
    currency: "EUR",
    touchpoints: 2,
    period: "monthly",
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
});
