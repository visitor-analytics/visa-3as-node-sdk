import dayjs from "dayjs";
import { PartnerDetails } from "../../common";
import { AccessToken } from "../access-token";
import { RS256TokenSigner } from "../rs256-signer";
import { TokenHeader, TokenPayload } from "../types";

export class AccessTokenFactory {
  getAccessToken(
    alg: "RS256",
    partner: PartnerDetails,
    clientVersion: string
  ): AccessToken {
    const header: TokenHeader = { kid: partner.id };
    const payload: TokenPayload = {
      sub: partner.domain,
      roles: ["intp"],
      exp: dayjs().add(10, "minutes").unix(),
      iat: dayjs().unix(),
      ver: clientVersion,
    };

    return new AccessToken({
      header,
      payload,
      signer: new RS256TokenSigner(partner.privateKey),
    });
  }
}
