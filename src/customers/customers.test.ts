import { mock, mockClear } from "jest-mock-extended";
import { HttpClient } from "../http-client";
import { CustomersApi } from ".";
import { CustomerApi } from ".";

describe("Customer(s)", () => {
  const customerExternalId = "ae14772b-4df0-4fe9-89e1-c7f8bb2378da";
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = mock<HttpClient>();
  });

  afterEach(() => {
    mockClear(httpClient);
  });

  describe("Customers-API", () => {
    let customersApi: CustomersApi;

    beforeEach(() => {
      customersApi = new CustomersApi(httpClient);
    });

    it("should call http client get when list() is called", () => {
      customersApi.list();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it("should call http client get when getById() is called", () => {
      customersApi.getById(customerExternalId);
      expect(httpClient.get).toHaveBeenCalled();
    });
  });

  describe("Customer-API", () => {
    let customerApi: CustomerApi;

    beforeEach(() => {
      customerApi = new CustomerApi(httpClient);
    });

    it("should call axios get when listWebsites() is called", () => {
      customerApi.setCustomerId(customerExternalId).listWebsites();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it("should throw an error if listWebsites() is called without setCustomerId()", async () => {
      await expect(customerApi.listWebsites()).rejects.toThrow();
    });
  });
});
