# VisitorAnalytics 3AS Node SDK

Provides easy access to VISA`s 3AS API.

## Instalation

```sh
npm install visa-3as --save
```

## Getting started

```js
var VisitorAnalytics = require("visa-3as");

var visa = new VisitorAnalytics({
  companyId: "REPLACE_WITH_YOUR_COMPANY_ID",
  companyDomain: "REPLACE_WITH_YOUR_COMPANY_DOMAIN_URL",
  companyPrivateKey: "REPLACE_WITH_PRIVATE_RSA_KEY",
});
```
