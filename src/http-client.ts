import axios, { Axios } from "axios";
import axiosRetry from "axios-retry";
import { AccessToken, AccessTokenFactory } from "./token-signing";
import { CompanyDetails } from "./common/types";
import { Logger, LogLevel } from "./common/logging";
import { Response, VisaApiResponse } from "./response";

axiosRetry(axios, { retries: 3 });

interface RouteArgs<T> {
  path: string;
  payload?: T;
}

interface RouteFunction<T> {
  (path: string, payload?: T): Promise<T | undefined>;
}

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

  #routeCreate<T>(axiosMethod: "post" | "get" | "patch" | "delete") {
    return async <T>(
      path: string,
      payload?: T
    ): Promise<Response<T | undefined>> => {
      this.#logger.logInfo({
        method: axiosMethod.toUpperCase(),
        path: this.#host + path,
        clientVer: this.#version,
      });

      if (this.#accessToken.isExpired) {
        this.#accessToken = this.#accessToken.refresh();

        this.#logger.logInfo("Refreshed access token.");
        this.#logger.logDebug(this.#accessToken.value);
      }

      try {
        let response;
        if (payload) {
          response = await this.#http[axiosMethod]<VisaApiResponse<T>>(
            this.#host + path,
            payload,
            {
              headers: {
                Authorization: "Bearer " + this.#accessToken.value,
              },
            }
          );
        } else {
          response = await this.#http[axiosMethod]<VisaApiResponse<T>>(
            this.#host + path,
            {
              headers: {
                Authorization: "Bearer " + this.#accessToken.value,
              },
            }
          );
        }

        this.#logger.logDebug(response.data as unknown as object);
        return new Response<T>(response);
      } catch (error) {
        this.#logger.logError((error as Error).message);
        return new Response<undefined>({} as never);
      }
    };
  }

  post = this.#routeCreate("post");
  get = this.#routeCreate("get");
  update = this.#routeCreate("patch");
  delete = this.#routeCreate("delete");
}
