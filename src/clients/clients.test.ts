import { mock, mockClear } from "jest-mock-extended";
import { HttpClient } from "../http-client";
import { Clients } from ".";
import { ClientApi } from ".";

describe("Client(s)", () => {
  const clientId = "ae14772b-4df0-4fe9-89e1-c7f8bb2378da";
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = mock<HttpClient>();
  });

  afterEach(() => {
    mockClear(httpClient);
  });

  describe("Clients", () => {
    let clients: Clients;

    beforeEach(() => {
      clients = new Clients(httpClient);
    });

    it("should call http client get when list() is called", () => {
      clients.list();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it("should call http client get when getById() is called", () => {
      clients.getById(clientId);
      expect(httpClient.get).toHaveBeenCalled();
    });
  });

  describe("Client-API", () => {
    let clientApi: ClientApi;

    beforeEach(() => {
      clientApi = new ClientApi(httpClient);
    });

    it("should call axios get when listWebsites() is called", () => {
      clientApi.setClientId(clientId).listWebsites();
      expect(httpClient.get).toHaveBeenCalled();
    });

    it("should throw an error if listWebsites() is called without setClientId()", async () => {
      await expect(clientApi.listWebsites()).rejects.toThrow();
    });
  });
});
