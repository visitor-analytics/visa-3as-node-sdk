import { HttpClient } from "../http-client";
import { Response } from "../response";
import { Customer } from "./types/customer.type";

export class CustomersApi {
  #path: string = "/v2/3as/customers";

  constructor(private readonly httpClient: HttpClient) {}

  async create(customer: Customer): Promise<Response<Customer | undefined>> {
    return this.httpClient.post<Customer | undefined>(this.#path, customer);
  }

  async list(): Promise<Response<Customer[] | undefined>> {
    return this.httpClient.get<Customer[] | undefined>(this.#path);
  }

  async getById(
    customerExternalId: string
  ): Promise<Response<Customer | undefined>> {
    return this.httpClient.get<Customer | undefined>(
      `${this.#path}/${customerExternalId}`
    );
  }

  async deleteById(
    customerExternalId: string
  ): Promise<Response<Customer | undefined>> {
    return this.httpClient.delete(`${this.#path}/${customerExternalId}`);
  }
}
