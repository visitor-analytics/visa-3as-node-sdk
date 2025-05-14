import { mock, mockClear } from "jest-mock-extended";
import { HttpClient } from "../http-client";
import { IntpcsApi } from ".";

describe("Customer(s)", () => {
  const intpcExternalId = "ae14772b-4df0-4fe9-89e1-c7f8bb2378da";
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = mock<HttpClient>();
  });

  afterEach(() => {
    mockClear(httpClient);
  });

  describe("Intpc-API", () => {
    let intpcsApi: IntpcsApi;

    beforeEach(() => {
      intpcsApi = new IntpcsApi(httpClient);
    });

    it("should call http client get when list() is called", () => {
      intpcsApi.list();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it("should call http client get when getById() is called", () => {
      intpcsApi.getByIntpCustomerId(intpcExternalId);
      expect(httpClient.get).toHaveBeenCalled();
    });
  });
});
