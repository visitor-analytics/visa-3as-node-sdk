import { AxiosResponse } from "axios";

export type VisaApiResponse<T> = {
  payload: T;
};

export class Response<T> {
  #statusCode: number;
  #body: string = "";
  #result: unknown;
  #payload: T;

  constructor(response: AxiosResponse<VisaApiResponse<T>>) {
    this.#statusCode = response.status;
    this.#body = JSON.stringify(response.data);
    this.#result = response.data;
    this.#payload = response.data.payload;
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
}
