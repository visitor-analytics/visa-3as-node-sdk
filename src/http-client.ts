import axios, { Axios } from "axios";
import axiosRetry from "axios-retry";
import { AccessToken, AccessTokenFactory } from "./token-signing";
import { Logger, LogLevel } from "./common/logging";
import { Response, VisaApiResponse } from "./response";
import { PartnerDetails } from "./common/types";
import { IFrameUtils } from "./common/iframe";

axiosRetry(axios, { retries: 3 });

export class HttpClient {
  // authentication
  #accessToken: AccessToken;
  // IFrame
  #iFrame: IFrameUtils;

  // logging
  #logger: Logger;

  #host: string;
  #http: Axios;
  #version: string = "rc";

  constructor(params: {
    readonly host: string;
    readonly partner: PartnerDetails;
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
      params.partner,
      this.#version
    );

    this.#iFrame = new IFrameUtils(this.#accessToken, params.environment);

    this.#logger.logInfo("Generated access token.");
    this.#logger.logDebug(this.#accessToken.value);
  }

  #routeCreate(axiosMethod: "post" | "get" | "patch" | "delete") {
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
        if (payload && axiosMethod !== "get" && axiosMethod !== "delete") {
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
