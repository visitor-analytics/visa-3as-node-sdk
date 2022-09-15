import { PaginatedResponse } from "../common";
import { HttpClient } from "../http-client";
import { CreateCustomer } from "./types/create-customer.type";
import { Customer } from "./types/customer.type";

export class CustomersApi {
  #path: string = "/v2/3as/customers";

  constructor(private readonly httpClient: HttpClient) {}

  async create(createCustomer: CreateCustomer): Promise<Customer> {
    return (
      await this.httpClient.post<Customer>(this.#path, createCustomer)
    ).getPayload();
  }

  async list(
    pagination: {
      page: number;
      pageSize: number;
    } = { page: 0, pageSize: 10 }
  ): Promise<PaginatedResponse<Customer>> {
    const response = await this.httpClient.get<Customer[]>(
      this.#path +
        "?page=" +
        pagination.page +
        "&pageSize=" +
        pagination.pageSize
    );

    return { items: response.getPayload(), metadata: response.getMetadata() };
  }

  async getByIntpCustomerId(intpCustomerId: string): Promise<Customer> {
    return (
      await this.httpClient.get<Customer>(this.#path + "/" + intpCustomerId)
    ).getPayload();
  }
}
