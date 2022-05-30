import dayjs from "dayjs";
import { TokenSigner } from "./interfaces";
import { TokenHeader, TokenPayload } from "./types";

export class AccessToken {
  #iat: number;
  #exp: number;
  #value: string;

  constructor(
    private readonly header: TokenHeader,
    private readonly payload: TokenPayload,
    private readonly tokenSigner: TokenSigner
  ) {
    this.#sign();
  }

  #sign(): AccessToken {
    try {
      this.#iat = Date.now();
      this.#exp = dayjs().add(30, "minutes").unix();
      this.#value = this.tokenSigner.sign(JSON.stringify(this.payload), {
        kid: this.header.kid,
      });

      return this;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          type: "TokenSignerError",
          message: "Failed to sign access token",
          details: error.message,
        })
      );
    }
  }

  get isExpired(): boolean {
    return this.#exp <= Date.now();
  }

  get issuedAt(): number {
    return this.#iat;
  }

  get value(): string {
    return this.#value;
  }

  get refresh(): AccessToken {
    return this.#sign();
  }
}
