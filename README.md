# VisitorAnalytics 3AS Node SDK

Provides easy access to VISA`s 3AS API.

- [VisitorAnalytics 3AS Node SDK](#visitoranalytics-3as-node-sdk)
  - [**Installation**](#installation)
  - [**Getting started**](#getting-started)
  - [**Promises**](#promises)
  - [**Customers**](#customers)
    - [List all available customers](#list-all-available-customers)
      - [Request](#request)
      - [Response](#response)
        - [Definition](#definition)
        - [Example](#example)
    - [Get a single Customer by ID](#get-a-single-customer-by-id)
      - [Request](#request-1)
      - [Response](#response-1)
        - [Definition](#definition-1)
        - [Example](#example-1)
  - [**Packages**](#packages)
    - [List all available packages](#list-all-available-packages)
      - [Request](#request-2)
      - [Response](#response-2)
        - [Definition](#definition-2)
        - [Example](#example-2)
    - [Get a single package by ID](#get-a-single-package-by-id)
      - [Response](#response-3)
        - [Definition](#definition-3)
        - [Example](#example-3)
  - [**Websites**](#websites)
    - [Get all websites](#get-all-websites)
      - [Request](#request-3)
      - [Response](#response-4)
        - [Definition](#definition-4)
        - [Example](#example-4)
    - [Get a single website by ID](#get-a-single-website-by-id)
      - [Request](#request-4)
      - [Response](#response-5)
        - [Definition](#definition-5)
        - [Example](#example-5)
  - [**Subscription Notifications**](#subscription-notifications)
    - [Subscription created Notification](#subscription-created-notification)
    - [Subscription updated Notification](#subscription-updated-notification)

<br>

## **Installation**

```sh
npm install visa-3as --save
```

<br>

## **Getting started**

```js
var VisitorAnalytics = require("visa-3as");

const visa = new VisitorAnalytics({
  partner: {
    id: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    privateKey: `...`,
  },
  env: "test",
  logLevel: LogLevel.INFO,
});
```

<br>

## **Promises**

Every API call returns a promise.

// add details on response format on success & error

<br>

## **Customers**

3AS Partners are able to get data about their customers.

### List all available customers

#### Request

```js
const customers = await visa.customers.list();
```

#### Response

##### Definition

```typescript
{
  "payload": [
    {
      "id": uuid,
      "externalId": uuid,
      "partnerId": uuid,
      "createdAt": Date
    }
  ],
  "meta": {
    "page": number,
    "pageSize": number,
    "pageTotal": number,
    "total": number
  }
}
```

##### Example

```js
{
  "payload": [
    {
      "id": "7128840a-5347-49a4-8dfa-9022d8dad21a",
      "externalId": "7128840a-5347-49a4-8dfa-9022d8dad21a",
      "partnerId": "7128840a-5347-49a4-8dfa-9022d8dad21a",
      "createdAt": "2019-12-01"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 10,
    "pageTotal": 100,
    "total": 92
  }
}
```

### Get a single Customer by ID

#### Request

```js
const customerId = "8e683b6a-9643-466b-ae63-bbffa7be18a1";

const customer = await visa.customers.getById(customerId);
```

#### Response

##### Definition

```ts
{
  "payload": {
    "id": uuid,
    "externalId": uuid,
    "partnerId": uuid,
    "createdAt": Date
  }
}
```

##### Example

```js
{
  "payload": {
    "id": "8e683b6a-9643-466b-ae63-bbffa7be18a1",
    "externalId": "7128840a-5347-49a4-8dfa-9022d8dad21a",
    "partnerId": "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    "createdAt": "2019-12-01"
  }
}
```

<br>

## **Packages**

3AS Partners are able to get data about their customers packages

### List all available packages

#### Request

```js
const packages = await visa.packages.get();
```

#### Response

##### Definition

```ts
{
  "payload": [
    {
      "id": uuid,
      "name": string,
      "touchPoints": number,
      "partnerId": uuid,
      "createdAt": Date
    }
  ]
}
```

##### Example

```js
{
  "payload": [
    {
      "id": "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02",
      "name": "Package Name",
      "touchPoints": 10000,
      "partnerId": "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
      "createdAt": "2019-12-01"
    }
  ]
}
```

### Get a single package by ID

```js
const packageId = "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02";

const package = await visa.packages.get(packageId);
```

#### Response

##### Definition

```ts
{
  "payload": {
    "id": uuid,
    "name": string,
    "touchPoints": number,
    "partnerId": uuid,
    "createdAt": Date
  }
}
```

##### Example

```js
{
  "payload": {
    "id": "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02",
    "name": "Package Name",
    "touchPoints": 10000,
    "partnerId": "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    "createdAt": "2019-12-01"
  }

}
```

<br>

## **Websites**

3AS Partners are able to get data about their customers websites.

### Get all websites

#### Request

```js
const customerId = "8e683b6a-9643-466b-ae63-bbffa7be18a1";

const websites = await visa.customer(customerId).listWebsites();
```

#### Response

##### Definition

```ts
{
  "payload": [
    {
      "id": uuid,
      "domain": uri,
      "customerId": uuid,
      "packageId": uuid,
      "createdAt": Date
    }
  ]
}
```

##### Example

```js
{
  "payload": [
    {
      "id": "73f8817d-dc16-43af-9da1-b4166c6d0613",
      "domain": "bigstuff.visitoranalytics.io",
      "customerId": "8e683b6a-9643-466b-ae63-bbffa7be18a1",
      "packageId": "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02",
      "createdAt": "2019-12-01"
    }
  ]
}
```

### Get a single website by ID

#### Request

```js
const websiteId = "73f8817d-dc16-43af-9da1-b4166c6d0613";

const website = await visa.websites.getById(websiteId);
```

#### Response

##### Definition

```ts
{
  "payload": {
    "id": uuid,
    "domain": uri,
    "customerId": uuid,
    "packageId": uuid,
    "createdAt": Date
  }
}
```

##### Example

```js
{
  "payload": {
    "id": "73f8817d-dc16-43af-9da1-b4166c6d0613",
    "domain": "bigstuff.visitoranalytics.io",
    "customerId": "8e683b6a-9643-466b-ae63-bbffa7be18a1",
    "packageId": "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02",
    "createdAt": "2019-12-01"
  }
}
```

<br>

## **Subscription Notifications**

3AS Partners must be able to send notifications through the SDK regarding the billing & subscription events

### Subscription created Notification

```js
visa.notify({
  type: "SUBSCRIPTION_CREATED",
  payload: {
    packageId: "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02",
    website: {
      id: "73f8817d-dc16-43af-9da1-b4166c6d0613",
      domain: "domain.visa.io",
      language: "en",
      timezone: "GMT+3",
    },
  },
});
```

### Subscription updated Notification

```js
visa.notify({
  type: "SUBSCRIPTION_UPDATED",
  payload: {
    packageId: "bec1c3a3-31e3-4b5d-b56e-d5084ed99f02",
    website: {
      id: "58173014-6dff-4bf2-a2ac-5682c68a49ea",
    },
  },
});
```
