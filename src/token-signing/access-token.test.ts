import dayjs from "dayjs";
import { AccessToken } from "./access-token";
import { RS256TokenSigner } from "./rs256-signer";

describe("AccessToken", () => {
  const privateKey = `-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAu8VEh1//OP8WTI+GM/KhCbM7T4+cQfHdXbkLzeZW1KCcg6d8\n63/thIDOcO3ddSUj09rApTQVQY5D2SrusJpacokGADQJAcEXYQj0NVxc0sjIN2KK\nUkRc/1wFWNh6uqtJSsV06/Lg9gqco5f2wZN1uGqvJGNP4o+CcOlbwa1aRanj03Il\nxWbg2r/fHLc3Q0dWaPpJXgX9baADMGyjOWOFNS2kaTofUYqz/qMIMrnyqNpXxic4\nZRZFjULUNG8gLVVO7GeTk7D23PI92RXZQRrrTi9adsbCdO0vpXVlEw+yfIO6KL3Y\nfEzFc8RRZasnSz9qMdD6wDrvxDEoa6fKTMJ3IQIDAQABAoIBAASPrjJ7qn9/8tK5\nSdFJO5A4wmAUZP9VGMOGEztVNRbFMAgisW4nFWX6mwkzPgXyeQRUdAmPUlTdV9iW\nqmWv2jKeEX8/xFg+kIrS5NvG+ppENljiE+obrwak/ZxC5fhS4NzoHwb8R2qyp0ty\nDZR2OI3aSZbgsrgWNFz5zjjONTsr8pdfuHbdJE1Xoo/U9X8L9NQjOPUjbN7YKA5S\nW2L1vjZFjTvdCrHda4OLygpIFwaJuOqc2k0RWa0Uxj99en4cBO4POe11e98jqfRk\nfHc0QBPMVwy1bgDVQryyn01YCHLJnd5T5FO2siNL3h1ERgEmEBpNaM+/nScrXV/d\ngCCV4GECgYEAwMk7OjbMP2q+XNwhCErgh2zGD+NzHx47IPGZEJkssQLFeV+g4PDo\nVFcXZ0IDReb0T1dNzd20dhDCZjrDLnwdUsyUOeIXksNmY+5lnndOE+Pn+rYC8QL+\nPvj1/R53hFhxIVJ5hA7T/eVRlcZ+hSswlSaCvtuDJgmzXbxvryV7JDMCgYEA+VcH\nWSGkabizDUXPN1TKhu4LhptQ7/SJFKk2WnRLOS3xQK3lYAAiJuVn/yj5W+7Nra+H\nlKwZ+OeGU4+VwYRu0A0lryGdCU5dXR+uziJy6CGHPNnF9HVEjpcNjo3Ja2+j272K\nqBvww2B1FDQEOla4cKTKhGQBnOYllWvcxUUwA1sCgYBosuC/lNMH/ei0dbha0I9v\n/Nrz9gqnc7uZAJyoLwfeeirU5+JvR2Zlp4bGRUuRwwQbssZGb4l6NU/eRTuLG0yx\nkvlNFkTHJ+eLjgUSMqjslHF/7ylZys5ZVMwDU3CFJ6MI/cmQtpza3peYR9yeZf5U\ngj2veXeYSNxoo9XjwO9HkQKBgQDxNqFUN/ifkmAdogBiLfQz7oxV72Gwkagfxcdg\nYIr5SRnQkaqKYfaoHFyse04pAvAVa+9FA+2oXwsTQaAF84FkYqOnNmR+QUKPOXxZ\nzPfO28jCNIeOA/iL3VPvKfnGpt0lUsuV8FnOGT2KivvgGE8cIkANLdZlnDyVviB4\n84MMawKBgQCmE7OhDFBFL++PI5rG314OGfN2kE2DliXMatYeij4QCf9pYbYD6GMD\ndd5NAWkAgbWqpuAWFh2BBNlNnf8dCv1+jaJvYY13o2le2diJayXWuozUoiv5hb1W\nFASkk1ft+y52je8jqtKzjKpXX/BEcN+u5V7SNkGVAbjApbLwYLvz7A==\n-----END RSA PRIVATE KEY-----`;

  it("should return a new signature after refresh", async () => {
    const accessToken = new AccessToken({
      header: {
        kid: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
      },
      payload: {
        iat: dayjs().unix(),
        exp: dayjs().add(10, "minutes").unix(),
      },
      signer: new RS256TokenSigner(privateKey),
    });

    const initialSignature = accessToken.value.split(".")[2];

    await wait(1000);

    const refreshedSignature = accessToken.refresh().value.split(".")[2];

    expect(initialSignature).not.toEqual(refreshedSignature);
  });
});

const wait = (millis: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(undefined);
    }, millis);
  });
};
