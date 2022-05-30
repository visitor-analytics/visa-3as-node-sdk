import dayjs from "dayjs";
import { CompanyDetails } from "../../common";
import { AccessToken } from "../access-token";
import { RS256TokenSigner } from "../rs256-signer";
import { TokenHeader, TokenPayload } from "../types";

export class AccessTokenFactory {
  getAccessToken(
    alg: "RS256",
    company: CompanyDetails,
    clientVersion: string
  ): AccessToken {
    const header: TokenHeader = { kid: company.id };
    const payload: TokenPayload = {
      sub: company.domain,
      roles: ["sdk"],
      exp: dayjs().add(10, "minutes").unix(),
      iat: dayjs().unix(),
      ver: clientVersion,
    };

    if (alg === "RS256") {
      return new AccessToken(
        header,
        payload,
        new RS256TokenSigner(company.privateKey)
      );
    }
  }
}
