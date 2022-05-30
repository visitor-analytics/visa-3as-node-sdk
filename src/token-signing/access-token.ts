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
    const now = dayjs();

    this.#iat = now.unix();
    this.#exp = now.add(10, "minutes").unix();
    this.#value = this.#sign();
  }

  #sign(): string {
    try {
      return this.tokenSigner.sign(JSON.stringify(this.payload), {
        kid: this.header.kid,
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

    this.#iat = now.unix();
    this.#exp = now.add(10, "minutes").unix();
    this.#value = this.#sign();

    return this;
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
}
