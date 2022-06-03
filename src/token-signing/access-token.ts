import dayjs from "dayjs";
import { TokenSigner } from "./interfaces";
import { TokenHeader, TokenPayload } from "./types";

export class AccessToken {
  #tokenHeader: TokenHeader;
  #tokenPayload: TokenPayload;
  #tokenSigner: TokenSigner;

  #value: string;

  constructor(params: {
    payload: TokenPayload;
    header: TokenHeader;
    signer: TokenSigner;
  }) {
    this.#tokenHeader = params.header;
    this.#tokenPayload = params.payload;
    this.#tokenSigner = params.signer;

    this.#value = this.#sign();
  }

  #sign(): string {
    try {
      return this.#tokenSigner.sign(this.#tokenPayload, {
        header: {
          kid: this.#tokenHeader.kid,
        },
      });
    } catch (error) {
      throw new Error(
        JSON.stringify({
          type: "TokenSignerError",
          message: "Failed to sign access token",
          details: (error as Error).message,
        })
      );
    }
  }

  refresh(): AccessToken {
    const now = dayjs();

    this.#tokenPayload.exp = now
      .add(this.#tokenPayload.exp - this.#tokenPayload.iat, "seconds")
      .unix();

    this.#tokenPayload.iat = now.unix();

    this.#value = this.#sign();

    return this;
  }

  get isExpired(): boolean {
    return dayjs().unix() > this.#tokenPayload.exp;
  }

  get value(): string {
    return this.#value;
  }
}
