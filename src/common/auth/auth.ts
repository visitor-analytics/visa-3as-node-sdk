import { AccessToken, AccessTokenFactory } from "../../token-signing";
import { PartnerDetails } from "../types";

export class AuthUtils {
  ROLE_INTP = "intp";
  ROLE_INTPC = "intpc";

  constructor(private readonly intp: PartnerDetails) {}

  public generateINTPAccessToken(): AccessToken {
    return AccessTokenFactory.getAccessToken({
      alg: "RS256",
      kid: this.intp.id,
      privateKey: this.intp.privateKey,
      claims: {
        role: "intp",
        intpId: this.intp.id,
      },
    });
  }

  public generateINTPcAccessToken(intpcId: string): AccessToken {
    return AccessTokenFactory.getAccessToken({
      alg: "RS256",
      kid: this.intp.id,
      privateKey: this.intp.privateKey,
      claims: {
        role: "intpc",
        intpId: this.intp.id,
        intpcId: intpcId,
      },
    });
  }
}
