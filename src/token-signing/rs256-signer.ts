import { sign } from "jsonwebtoken";
import { TokenSigner } from "./interfaces";

export class RS256TokenSigner implements TokenSigner {
  constructor(private readonly privateKey: string) {}

  sign(payload: string, options: { kid: string }): string {
    return sign(payload, this.privateKey, {
      algorithm: "RS256",
      keyid: options.kid,
    });
  }
}
