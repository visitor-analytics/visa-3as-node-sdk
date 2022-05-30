import got, { Got } from "got";
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
  #http: Got;
  #version: string = "rc";
  #environment: "production" | "test" = "test";

  constructor(params: {
    readonly host: string;
    readonly company: CompanyDetails;
    readonly logLevel?: "debug" | "info" | "error" | "silent";
    readonly environment: "production" | "test";
  }) {
    this.#http = got;
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

  async get<T>(path: string): Promise<T> {
    if (this.#accessToken.isExpired) {
      this.#logInfo("Access token expired. Obtaining new access token.");
      this.#accessToken = this.#accessToken.refresh();
    }

    return this.#http
      .get(this.#host + path, {
        headers: {
          Authorization: "Bearer " + this.#accessToken.value,
        },
      })
      .json<T>();
  }

  #logInfo(msg: string): void {
    this.#logger.info(
      JSON.stringify({
        msg,
        host: this.#host,
        env: this.#environment,
        clientVersion: this.#version,
      })
    );
  }

  #logError(msg: string): void {
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
