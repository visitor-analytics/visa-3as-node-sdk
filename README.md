# VisitorAnalytics 3AS Node SDK

Provides easy access to VISA`s 3AS API.

## Installation

```sh
npm install @visitor-analytics/3as-sdk --save
```

## Getting started

```js
import { VisitorAnalytics, LogLevel } from "@visitor-analytics/3as-sdk";

const visa = new VisitorAnalytics({
  intp: {
    id: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    privateKey: `...`,
  },
  env: "dev",
  logLevel: LogLevel.INFO,
});
```

## Promises

Every API call returns a promise.

// add details on response format on success & error

## Customers API

Integration partners (INTP) are able to get data about their customers (INTPc).

### List all available customers

```js
visa.customers.list();
```

### Get a single customer by its INTP given id

```javascript
visa.customers.getByIntpCustomerId(INTP_CUSTOMER_ID);
```

### Register a new customer

```javascript
visa.customers.create({
  intpCustomerId: INTP_CUSTOMER_ID,
  email: INTP_CUSTOMER_EMAIL,
  website: {
    intpWebsiteId: INTP_WEBSITE_ID,
    domain: INTP_WEBSITE_DOMAIN_URI,
    packageId: PACKAGE_UUID,
  },
});
```

## Customer API

### List all websites belonging to an INTP Customer

```javascript
visa.customer(INTP_CUSTOMER_ID).listWebsites();
```

### Delete a Customer belonging to an INTP

```js
visa.customer(INTP_CUSTOMER_ID).delete();
```

### Generate the VisitorAnalytics Dashboard IFrame Url

```js
visa.customer(INTP_CUSTOMER_ID).generateIFrameDashboardUrl(INTP_WEBSITE_ID);
```

## Packages API

An Integration Partner (INTP) is able to get data about their packages

### List all available packages

```js
visa.packages.list();
```

### Get a single package by ID

```js
visa.packages.getById(PACKAGE_UUID);
```

### Create a package

```js
visa.packages.create({
  name: PACKAGE_NAME,
  touchpoints: TOUCHPOINT_LIMIT,
  price: FLOAT,
  currency: CURRENCY_CODE, // ex: EUR, USD, RON
  period: PERIOD, // monthly, yearly
});
```

## Package API

### An INTP can update its packages

```js
visa.package(PACKAGE_UUID).update({
  name: UPDATED_PACKAGE_NAME,
});
```

## Websites API

### List all websites

```js
visa.websites.list();
```

### Get a single website by its INTP given id

```js
visa.websites.getByIntpWebsiteId(INTP_WEBSITE_ID);
```

### Create a website

```js
visa.websites.create({
  intpWebsiteId: INTP_WEBSITE_ID,
  intpCustomerId: INTP_CUSTOMER_ID,
  domain: INTP_WEBSITE_DOMAIN,
  packageId: PACKAGE_UUID,
});
```

## Website API

### Delete a website by its INTP given id

```js
visa.website(INTP_WEBSITE_ID)->delete();
```

## Subscription Notifications

### API for managing subscription state

### Upgrade - immediately applies a higher stp count package to the subscription

```js
visa.subscriptions.upgrade({
  intpWebsiteId: INTP_WEBSITE_ID,
  packageId: PACKAGE_UUID,
});
```

### Downgrade - auto-renew the subscription at the end of the current billing interval to a new lower stp count package

```js
visa.subscriptions.downgrade({
  intpWebsiteId: INTP_WEBSITE_ID,
  packageId: PACKAGE_UUID,
});
```

### Cancel - disable the subscription auto-renewal at the end of the current billing interval

```js
visa.subscriptions.cancel({
  intpWebsiteId: INTP_WEBSITE_ID,
});
```

### Resume - re-enable the subscription auto-renewal at the end of the current billing interval

```js
visa.subscriptions.resume({
  intpWebsiteId: INTP_WEBSITE_ID,
});
```

### Deactivate - immediately disables the subscription, reversible by an upgrade

```php
visa.subscriptions.deactivate({
  intpWebsiteId: INTP_WEBSITE_ID,
});
```

## Utils API

### Generate a valid access token for the current INTP configuration.

```js
visa.auth.generateINTPAccessToken();
```

### Generate a valid access token for the current INTPc configuration.

```js
visa.auth.generateINTPcAccessToken(INTP_CUSTOMER_ID);
```
