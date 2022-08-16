import { AxiosResponse } from "axios";

export type VisaApiResponse<T> = {
  payload: T;
  meta: PaginationMetadata;
};

export type PaginationMetadata = {
  page: number;
  pageSize: number;
  pageTotal: number;
  total: number;
};

export class Response<T> {
  #statusCode: number;
  #body: string = "";
  #result: unknown;
  #payload: T;
  #metadata: PaginationMetadata = {
    page: 0,
    pageSize: 0,
    pageTotal: 0,
    total: 0,
  };

  constructor(response: AxiosResponse<VisaApiResponse<T>>) {
    this.#statusCode = response.status;
    this.#body = JSON.stringify(response.data);
    this.#result = response.data;
    this.#payload = response.data.payload;

    if (response.data.meta) {
      this.#metadata = response.data.meta;
    }
  }

  getStatusCode(): number {
    return this.#statusCode;
  }

  getBody(): string {
    return this.#body;
  }

  getResult(): unknown {
    return this.#result;
  }

  getPayload(): T {
    return this.#payload;
  }

  getMetadata(): PaginationMetadata {
    return this.#metadata;
  }
}
