import axios, { Axios } from "axios";
import pino, { Logger } from "pino";
import { AccessToken, AccessTokenFactory } from "./token-signing";
import { CompanyDetails } from "./common/types";

export class Client {
  // authentication
  #accessToken: AccessToken;
  // logging
  #logger: Logger;
  #logLevel: "debug" | "info" | "error" | "silent";

  #host: string;
  #http: Axios;
  #version: string = "rc";
  #environment: "production" | "test" = "test";

  constructor(params: {
    readonly host: string;
    readonly company: CompanyDetails;
    readonly logLevel?: "debug" | "info" | "error" | "silent";
    readonly environment: "production" | "test";
  }) {
    this.#http = axios;
    this.#host = params.host;
    this.#logger = pino();
    this.#logLevel = params.logLevel ?? "debug";
    this.#environment = params.environment;

    this.#accessToken = new AccessTokenFactory().getAccessToken(
      "RS256",
      params.company,
      this.#version
    );
  }

  async get<T>(path: string): Promise<T | undefined> {
    if (this.#accessToken.isExpired) {
      this.#logInfo("Access token expired. Obtaining new access token.");
      this.#accessToken = this.#accessToken.refresh();
    }

    try {
      const response = await this.#http.get<T>(this.#host + path, {
        headers: {
          Authorization: "Bearer " + this.#accessToken.value,
        },
      });

      this.#logInfo({
        path,
        method: "get",
        success: true,
        data: response.data,
      });

      return response.data;
    } catch (error) {
      this.#logError({
        path,
        method: "get",
        success: false,
        msg: (error as Error).message,
      });
    }
  }

  #logInfo(msg: string | object): void {
    this.#logger.info(
      JSON.stringify({
        msg,
        host: this.#host,
        env: this.#environment,
        clientVersion: this.#version,
      })
    );
  }

  #logError(msg: string | object): void {
    this.#logger.info(
      JSON.stringify({
        msg,
        host: this.#host,
        env: this.#environment,
        clientVersion: this.#version,
      })
    );
  }
}
