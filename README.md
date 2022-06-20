# VisitorAnalytics 3AS Node SDK

Provides easy access to VISA`s 3AS API.

## Instalation

```sh
npm install visa-3as --save
```

## Getting started

```js
var VisitorAnalytics = require("visa-3as");

const visa = new VisitorAnalytics({
  company: {
    id: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    domain: "http://3as-company-domain.io",
    privateKey: `...`,
  },
  environment: "test",
  logLevel: LogLevel.INFO,
});
```

## Promises

Every API call returns a promise.

// add details on response format on success & error

## Packages

### List all available packages

```js
visa.packages.get();
```

### Get a single package by ID

```js
visa.packages.get({
  id: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
});
```
