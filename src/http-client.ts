import axios, { Axios } from "axios";
import axiosRetry from "axios-retry";
import { AccessToken, AccessTokenFactory } from "./token-signing";
import { CompanyDetails } from "./common/types";
import { Logger, LogLevel } from "./common/logging";
import { Response, VisaApiResponse } from "./response";

axiosRetry(axios, { retries: 3 });

export class HttpClient {
  // authentication
  #accessToken: AccessToken;
  // logging
  #logger: Logger;

  #host: string;
  #http: Axios;
  #version: string = "rc";

  constructor(params: {
    readonly host: string;
    readonly company: CompanyDetails;
    readonly logLevel: LogLevel;
    readonly environment: "production" | "test";
  }) {
    this.#http = axios;
    this.#host = params.host;
    this.#logger = new Logger({
      env: params.environment,
      level: params.logLevel,
    });

    this.#accessToken = new AccessTokenFactory().getAccessToken(
      "RS256",
      params.company,
      this.#version
    );

    this.#logger.logInfo("Generated access token.");
    this.#logger.logDebug(this.#accessToken.value);
  }

  async get<T>(path: string): Promise<Response<T | undefined>> {
    this.#logger.logInfo({
      method: "GET",
      path: this.#host + path,
      clientVer: this.#version,
    });

    if (this.#accessToken.isExpired) {
      this.#accessToken = this.#accessToken.refresh();

      this.#logger.logInfo("Refreshed access token.");
      this.#logger.logDebug(this.#accessToken.value);
    }

    try {
      const result = await this.#http.get<VisaApiResponse<T>>(
        this.#host + path,
        {
          headers: {
            Authorization: "Bearer " + this.#accessToken.value,
          },
        }
      );

      return new Response<T>(result);
    } catch (error) {
      this.#logger.logError((error as Error).message);
      return new Response<undefined>({} as never);
    }
  }

  async post<T>(path: string): Promise<Response<T | undefined>> {
    this.#logger.logInfo({
      method: "POST",
      path: this.#host + path,
      clientVer: this.#version,
    });

    if (this.#accessToken.isExpired) {
      this.#accessToken = this.#accessToken.refresh();

      this.#logger.logInfo("Refreshed access token.");
      this.#logger.logDebug(this.#accessToken.value);
    }

    try {
      const result = await this.#http.post<VisaApiResponse<T>>(
        this.#host + path,
        {
          headers: {
            Authorization: "Bearer " + this.#accessToken.value,
          },
        }
      );

      return new Response<T>(result);
    } catch (error) {
      this.#logger.logError((error as Error).message);
      return new Response<undefined>({} as never);
    }
  }
}
