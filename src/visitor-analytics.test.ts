import { LogLevel, VisitorAnalytics } from ".";

const PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCEuiQbjbI7IBcT
G95DXPZ8MTXHt7rpBTgJgtTJz/NgAu2FbTeNTFTYrK4Ifgu/tDVHKohkludaC+QF
pBqQRdkfr43DFGBUFuaIc8zjHDUrA5fmacfCt0GaQSFxN9hStx1lO/PZ8k9vF4Vr
SbwIrqbd9ZDU6JddEMbC5pC3sdfhsj6YeGs8D7J6wptru7qWUYyueQ0M9+Y8WthF
nnpou9f2pHtmTjLB0iL6qIL/sS3WGPahfbyqzJwredaJYkbKQwi6jYqPDvtkF4C2
EbIcahQzepG7B1aPnXb4UKXj+bY8a7uBsGpvylsGILGYZzH8nnNJ+64ZvlPUwpGA
KZJ1XMcXAgMBAAECggEATmqrapwM8WHEQEX2y1XhSv7IB3dFtuaedQAXOCTkZZVV
P7+HUrQGbP2Y1OujhV+zGpjGfKeriEf+MFcEWrjpzw6pcthXEVd2XKgOJSBFSWSW
Gkvk+eXLnJdeasXTyQrnEyiYqeu/gqMi8IBf18FYVUsAhsnko9eFlyEh32XzZiRK
/00o+AI4j7oJba8A7s48LaSaLVRaxHr36zlFPkdIH5JKa98PQAla7lxwJLKZua2P
M9QgLQndCMP6qW1AUGcap+l3VtsXoE40Ffblp6Z8dPaQWcNI/zJYwPRB5AAFcjYQ
D9nKqtVo+MpZciozIO3LGs3IfRj2zJLytYVGn5weAQKBgQDh9FQNy2ikBpc+w2ep
bLyHPPU+4lCLsn+FAZMHJibrzoFX7QbW530y7UlsMVj66BVbXyB+sjnlKPvqscyV
acJypyrVhRg0ILJOiFfkj6E1zIiKczM2m7d4orpYvNSPc3g9NyRwdw564J2vv4TC
3VzLdyx9yJSx8y+JtubGQYvgzQKBgQCWYEekflSlZXK01M7kiRyQrxOfFFe/7ZL9
9kjohp/hvpnDbtlf4PB5oK5wFMd+zWJUzBMPavdbEKkPFfIVrUDUmerAdiqEb/+B
6b03jmWdeus5Gmw5v3Wz8hAlo/V8WbHkOp0mXuv7jojPhDt4W4xCotR0yzqjU1Wu
Bj8D0CX3cwKBgEkj66ljdIXT1FVurzl6hzRHmSM34ta1eu206sDfqq2d9ORfR119
JVu8z42EE8d0JKWlD0Gzs2XodFMuJoke6OBwGD9xi7oj81PUco77pzVg9bnLPIKq
uSMFmchrp2qf+AXouZTmFPvVhXWESxdAzG7YLsCwkuFfVL4BRIZcZUjpAoGAQsxS
Bsf3YeFGqv09Sld90Od0l925fRBTk2yrxl7G9shsFVxQQz7wk5bE5hTU6YbifziH
3vltF463CnR9LRPhEI+ur//NszbtERB7dQpUKThI9Py/xoc+CcklUxMaITrWwsMm
u7y+pugR7dyXbkd8br1WEuuUCKkkDkHIDDGSK/ECgYBmpOHBc3oA3/5EmkouqUaG
SOwLDyEKIchpC1a/tFBqGl2bCW3QnORX4ihpqybDneDti5bzWKTgZBRq5oAMwPuk
0q4+pGVthf43X31CNwu9UeVvhek7oH9iLl4dGG+NCogCC5R/TH1EMwFLuDOzgGyq
rn1iADcyL3ZX75/vG8TFLA==
-----END PRIVATE KEY-----`;

describe("VisitorAnalytics", () => {
  it("", async () => {
    const visa = new VisitorAnalytics({
      intp: {
        id: "a078c06b-3301-44e4-a650-2725539456f6",
        privateKey: PRIVATE_KEY,
      },
      env: "dev",
      logLevel: LogLevel.DEBUG,
    });

    // console.log(visa.auth.generateINTPAccessToken().value);

    // PACKAGES
    // console.log(await visa.packages.list());
    // console.log(
    //   await visa.packages.getById("5ecff82d-c391-48e6-9205-b96818aa25ff")
    // );
    // console.log(
    //   await visa.packages.create({
    //     name: "ADV",
    //     touchpoints: 10000,
    //     price: 39.99,
    //     currency: "EUR",
    //   })
    // );

    // CUSTOMERS
    // console.log(await visa.customers.list());
    // console.log(await visa.customers.getByIntpCustomerId("x-1"));

    // await visa.customers.create({
    //   intpCustomerId: "x-2",
    //   email: "3rwerw-tew@x.com",
    //   website: {
    //     intpWebsiteId: " ",
    //     domain: "",
    //     packageId: "",
    //   },
    // });

    // CUSTOMER
    // console.log(await visa.customer("x-1").listWebsites());
    // console.log(await visa.customer("x-1").delete());
    // console.log(
    //   visa.customer("x-1").generateIFrameDashboardUrl("intpc-ws-001")
    // );

    // WEBSITES
    // console.log(await visa.websites.list());
    // console.log(await visa.websites.getByIntpWebsiteId("intpc-ws-001"));
    // console.log(
    //   await visa.websites.create({
    //     intpCustomerId: "x-1",
    //     intpWebsiteId: "dasfsdfs",
    //     domain: "eaxample.io",
    //     packageId: "",
    //   })
    // );

    // WEBSITE
    // console.log(await visa.website("intpc-ws-001").delete());
  });
});
