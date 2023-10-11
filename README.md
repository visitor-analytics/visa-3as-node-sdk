# VisitorAnalytics 3AS Node SDK

A simple API wrapper for integrating the Analysis as a Service (3AS) APIs provided by Visitor Analytics

## Getting started

1. [Create an RSA Key Pair (PEM format)](#creating-an-rsa-key-pair)
1. Send the resulting public key (`jwtRS256.key.pub`) to the Visitor Analytics Dev Team
1. [Install the library](#installation)
1. [Use the SDK instance](#how-to-use-the-library) to interract with the API

## Installation

```sh
npm install @visitor-analytics/3as-sdk --save
```

## How to use the library

```js
import { VisitorAnalytics, LogLevel } from "@visitor-analytics/3as-sdk";

const visa = new VisitorAnalytics({
  intp: {
    id: "979c93c5-b4de-4fd2-8ecf-bfd18bfaeecb",
    privateKey: `...`,
  },
  env: "stage",
  logLevel: LogLevel.INFO,
});
```

## Creating an RSA Key pair

1. Create the keypair: `ssh-keygen -t rsa -b 2048 -m PEM -f jwtRS256.key`
1. Convert the public key to PEM: `openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub`

## Concepts

### Terms

- **INTP (Integration Partner)**\
   The company that is integrating the analytics as a service solution (3AS)
- **STPs (Server Touchpoints)**\
   Credits used to measure data usage for a given website
- **Customer (INTPC integration partner customer)**\
   One user of the INTP, can have many websites
- **Website**\
   The website where data will be tracked. It has a subscription with a package with a certain limit of STPs.
  This subscription can be upgraded or downgraded.
  When the website is created a tracking code snippet is returned that must be embedded within the websites HTML.
- **Package**\
   A package has a price and contains a certain number of STPs. They are used when upgrading/downgrading the subscription of a website.

### General

Most endpoints that deal with customers or websites support some form of an ID which can be provided and then used for all following requests.

For example creating a new customer with a website requires an `intpCustomerId` and an `intpWebsiteId`. These must be provided by the INTP and are intended to make integrations easier because there is no need to save any external IDs. Then when getting data about a customer the request is done using the same `intpCustomerId` provided on creation.

**Example implementation flow**

1. Create a new customer with a website
1. Inject the resulting tracking code in the website's HTML
1. Use the SDK's [generate iframe url](#generate-the-visitoranalytics-dashboard-iframe-url) method to create an url
1. Show an iframe to the user with the url created previously
1. Show a modal to the user to upgrade his subscription
1. Display all the available packages using the SDK
1. After the payment is complete, use the SDK to upgrade the subscription of the website

## Available APIs

- [Customers](#customers-api)
- [Customer](#customer-api)
- [Package](#package-api)
- [Packages](#packages-api)
- [Website](#website-api)
- [Websites](#websites-api)
- [Utils](#utils-api)

### Customers API

Integration partners (INTP) are able to get data about their customers (INTPc).

#### List all available customers

```js
visa.customers.list();
```

#### Get a single customer by its INTP given id

```javascript
visa.customers.getByIntpCustomerId(INTP_CUSTOMER_ID);
```

#### Register a new customer

```javascript
visa.customers.create({
  intpCustomerId: INTP_CUSTOMER_ID,
  email: INTP_CUSTOMER_EMAIL,
  website: {
    intpWebsiteId: INTP_WEBSITE_ID,
    domain: INTP_WEBSITE_DOMAIN_URI,
    packageId: PACKAGE_UUID,
    billingDate: ISO_DATE_STRING, (optional, defaults to current time)
  },
});
```

### Customer API

#### List all websites belonging to an INTP Customer

```javascript
visa.customer(INTP_CUSTOMER_ID).listWebsites();
```

#### Delete a Customer belonging to an INTP

```js
visa.customer(INTP_CUSTOMER_ID).delete();
```

#### Generate the VisitorAnalytics Dashboard IFrame Url

```js
visa.customer(INTP_CUSTOMER_ID).generateIFrameDashboardUrl(INTP_WEBSITE_ID);
```

### Packages API

An Integration Partner (INTP) is able to get data about their packages

#### List all available packages

```js
visa.packages.list();
```

#### Get a single package by ID

```js
visa.packages.getById(PACKAGE_UUID);
```

#### Create a package

```js
visa.packages.create({
  name: PACKAGE_NAME,
  touchpoints: TOUCHPOINT_LIMIT,
  price: FLOAT,
  currency: CURRENCY_CODE, // ex: EUR, USD, RON
  period: PERIOD, // monthly, yearly
});
```

### Package API

#### An INTP can update its packages

```js
visa.package(PACKAGE_UUID).update({
  name: UPDATED_PACKAGE_NAME,
});
```

### Websites API

#### List all websites

```js
visa.websites.list();
```

#### Get a single website by its INTP given id

```js
visa.websites.getByIntpWebsiteId(INTP_WEBSITE_ID);
```

#### Create a website

```js
visa.websites.create({
  intpWebsiteId: INTP_WEBSITE_ID,
  intpCustomerId: INTP_CUSTOMER_ID,
  domain: INTP_WEBSITE_DOMAIN,
  packageId: PACKAGE_UUID,
  billingDate: ISO_DATE_STRING, (optional, defaults to current time)
});
```

### Website API

#### Delete a website by its INTP given id

```js
visa.website(INTP_WEBSITE_ID)->delete();
```

### API for managing subscription state

#### Upgrade - immediately applies a higher stp count package to the subscription

```js
visa.subscriptions.upgrade({
  intpWebsiteId: INTP_WEBSITE_ID,
  packageId: PACKAGE_UUID,
  trial: true | false,
  proRate: true | false,
});
```

#### Downgrade - auto-renew the subscription at the end of the current billing interval to a new lower stp count package

```js
visa.subscriptions.downgrade({
  intpWebsiteId: INTP_WEBSITE_ID,
  packageId: PACKAGE_UUID,
});
```

#### Cancel - disable the subscription auto-renewal at the end of the current billing interval

```js
visa.subscriptions.cancel({
  intpWebsiteId: INTP_WEBSITE_ID,
});
```

#### Resume - re-enable the subscription auto-renewal at the end of the current billing interval

```js
visa.subscriptions.resume({
  intpWebsiteId: INTP_WEBSITE_ID,
});
```

#### Deactivate - immediately disables the subscription, reversible by an upgrade

```php
visa.subscriptions.deactivate({
  intpWebsiteId: INTP_WEBSITE_ID,
});
```

### Utils API

#### Generate a valid access token for the current INTP configuration.

```js
visa.auth.generateINTPAccessToken();
```

#### Generate a valid access token for the current INTPc configuration.

```js
visa.auth.generateINTPcAccessToken(INTP_CUSTOMER_ID);
```

## Dashboard IFrame

The IFrame is one of the main ways a user can interract with the data gathered for his website. The URL of the IFrame is [generated using the SDK](#generate-the-visitoranalytics-dashboard-iframe-url)

The resulting URL can be further enhanced with query parameters:

1. `allowUpgrade=true` - Show upgrade CTAs

Upgrade buttons will be added to the Dashboard for all features that require a certain minimum package.
Once the upgrade button is clicked, the iframe posts a message to the parent frame, containing the following payload: 


```javascript
{
  "type": "UPGRADE_BUTTON_CLICKED",
  "data": {
    "intpWebsiteId": "", // string; external website id
    "intpCustomerId": "", // string; customer id
    "packageName": "", // string; current package name
    "packageId": "", // string; current package id
    "inTrial": true|false, // boolean;
    "expiresAt": "", // string; expiry date in ISO 8601 format
    "billingInterval": "monthly"|"yearly" // string;
  }
}
```
