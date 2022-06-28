import { LogLevel } from "./index";
import { VisitorAnalytics } from "./visitor-analytics";

import {
  AccessToken,
  AccessTokenFactory,
  RS256TokenSigner,
} from "./token-signing";
import dayjs from "dayjs";

jest.mock("./token-signing/access-token.ts");

describe("http-client", () => {
  let visitorAnalytics: VisitorAnalytics;
  const companyId = "2";
  const domain = "domain";
  const environment = "test";
  const logLevel = LogLevel.DEBUG;

  const privateKey = `-----BEGIN RSA PRIVATE KEY-----
  MIIEpAIBAAKCAQEAu8VEh1//OP8WTI+GM/KhCbM7T4+cQfHdXbkLzeZW1KCcg6d8
  63/thIDOcO3ddSUj09rApTQVQY5D2SrusJpacokGADQJAcEXYQj0NVxc0sjIN2KK
  UkRc/1wFWNh6uqtJSsV06/Lg9gqco5f2wZN1uGqvJGNP4o+CcOlbwa1aRanj03Il
  xWbg2r/fHLc3Q0dWaPpJXgX9baADMGyjOWOFNS2kaTofUYqz/qMIMrnyqNpXxic4
  ZRZFjULUNG8gLVVO7GeTk7D23PI92RXZQRrrTi9adsbCdO0vpXVlEw+yfIO6KL3Y
  fEzFc8RRZasnSz9qMdD6wDrvxDEoa6fKTMJ3IQIDAQABAoIBAASPrjJ7qn9/8tK5
  SdFJO5A4wmAUZP9VGMOGEztVNRbFMAgisW4nFWX6mwkzPgXyeQRUdAmPUlTdV9iW
  qmWv2jKeEX8/xFg+kIrS5NvG+ppENljiE+obrwak/ZxC5fhS4NzoHwb8R2qyp0ty
  DZR2OI3aSZbgsrgWNFz5zjjONTsr8pdfuHbdJE1Xoo/U9X8L9NQjOPUjbN7YKA5S
  W2L1vjZFjTvdCrHda4OLygpIFwaJuOqc2k0RWa0Uxj99en4cBO4POe11e98jqfRk
  fHc0QBPMVwy1bgDVQryyn01YCHLJnd5T5FO2siNL3h1ERgEmEBpNaM+/nScrXV/d
  gCCV4GECgYEAwMk7OjbMP2q+XNwhCErgh2zGD+NzHx47IPGZEJkssQLFeV+g4PDo
  VFcXZ0IDReb0T1dNzd20dhDCZjrDLnwdUsyUOeIXksNmY+5lnndOE+Pn+rYC8QL+
  Pvj1/R53hFhxIVJ5hA7T/eVRlcZ+hSswlSaCvtuDJgmzXbxvryV7JDMCgYEA+VcH
  WSGkabizDUXPN1TKhu4LhptQ7/SJFKk2WnRLOS3xQK3lYAAiJuVn/yj5W+7Nra+H
  lKwZ+OeGU4+VwYRu0A0lryGdCU5dXR+uziJy6CGHPNnF9HVEjpcNjo3Ja2+j272K
  qBvww2B1FDQEOla4cKTKhGQBnOYllWvcxUUwA1sCgYBosuC/lNMH/ei0dbha0I9v
  /Nrz9gqnc7uZAJyoLwfeeirU5+JvR2Zlp4bGRUuRwwQbssZGb4l6NU/eRTuLG0yx
  kvlNFkTHJ+eLjgUSMqjslHF/7ylZys5ZVMwDU3CFJ6MI/cmQtpza3peYR9yeZf5U
  gj2veXeYSNxoo9XjwO9HkQKBgQDxNqFUN/ifkmAdogBiLfQz7oxV72Gwkagfxcdg
  YIr5SRnQkaqKYfaoHFyse04pAvAVa+9FA+2oXwsTQaAF84FkYqOnNmR+QUKPOXxZ
  zPfO28jCNIeOA/iL3VPvKfnGpt0lUsuV8FnOGT2KivvgGE8cIkANLdZlnDyVviB4
  84MMawKBgQCmE7OhDFBFL++PI5rG314OGfN2kE2DliXMatYeij4QCf9pYbYD6GMD
  dd5NAWkAgbWqpuAWFh2BBNlNnf8dCv1+jaJvYY13o2le2diJayXWuozUoiv5hb1W
  FASkk1ft+y52je8jqtKzjKpXX/BEcN+u5V7SNkGVAbjApbLwYLvz7A==
  -----END RSA PRIVATE KEY-----`;

  beforeAll(() => {
    // visitorAnalytics = new VisitorAnalytics({
    //   company: { id: companyId, domain, privateKey },
    //   environment,
    //   logLevel,
    // });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it.skip("refresh the token when it is expired", async () => {
    // jest
    //   .spyOn(AccessToken.prototype, "isExpired", "get")
    //   .mockImplementation(() => {
    //     return true;
    //   });
    const accessToken = new AccessTokenFactory().getAccessToken(
      "RS256",
      {
        id: "2",
        domain: "domain",
        privateKey,
      },
      "rc"
    );
    expect(AccessToken).toHaveBeenCalled();
    console.log(
      "🚀 ~ file: http-client.test.ts ~ line 75 ~ accessToken",
      accessToken
    );

    // console.log(
    //   "🚀 ~ file: http-client.test.ts ~ line 75 ~ accessToken",
    //   accessToken
    // );
    // // const accessToken = new AccessToken({
    // //   header: {
    // //     kid: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    // //   },
    // //   payload: {
    // //     iat: dayjs().unix(),
    // //     exp: dayjs().add(10, "minutes").unix(),
    // //   },
    // //   signer: new RS256TokenSigner(privateKey),
    // // });
    // expect(accessToken.isExpired).toEqual(true);
  });
});
