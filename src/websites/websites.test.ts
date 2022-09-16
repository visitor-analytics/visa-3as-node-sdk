import { mock, mockClear } from "jest-mock-extended";
import { WebsitesApi } from "./websites-api";
import { HttpClient } from "../http-client";

describe("Websites", () => {
  const websiteId = "b4e32bde-43ca-48f0-b059-39bde9215599";
  let websitesApi: WebsitesApi;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = mock<HttpClient>();
    websitesApi = new WebsitesApi(httpClient);
  });

  afterEach(() => {
    mockClear(httpClient);
  });

  it("should call http-client get when getById is called", () => {
    websitesApi.getByIntpWebsiteId(websiteId);
    expect(httpClient.get).toHaveBeenCalled();
  });
});
