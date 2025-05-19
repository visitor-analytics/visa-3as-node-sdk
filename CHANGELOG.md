# @visitor-analytics/3as-sdk

## 3.0.2

- Export all typescript types

## 3.0.1

- Small bug fixes

## 3.0.0

This is a release with **BREAKING** changes:

- Add support for website/intpc subscriptions
- Align internal nomenclature for 3AS:

### Migration guide

1. Replace `visa.customers.*` => `visa.intpcs.*`
2. Replace `visa.customer(...)` => `visa.intpc(...)`
3. Replace `visa.subscriptions.*` => `visa.websiteSubscriptions.*`
4. To maintain current website subscriptions (previously the single subscription type available) behaviour, refactor `visa.websites.create` like this:
   - Old signature:
    ```js
    visa.websites.create({
        intpWebsiteId: INTP_WEBSITE_ID,
        intpCustomerId: INTP_CUSTOMER_ID,
        domain: INTP_WEBSITE_DOMAIN,
        packageId: PACKAGE_UUID,
        billingDate: ISO_DATE_STRING, // (optional, defaults to current time)
    });
    ```
   - New signature:
    ```js
    visa.websites.create({
        website: {
            id: INTP_WEBSITE_ID,
            domain: INTP_WEBSITE_DOMAIN,
            package: {
                id: PACKAGE_UUID,
                billingDate: ISO_DATE_STRING, // (optional, defaults to current time)
            }
        },
        intpc: {
            id: INTP_CUSTOMER_ID,
        },
    });
    ```

## 2.1.2

### Patch Changes

- cleanup comments

## 2.1.1

### Patch Changes

- remove validation schemas

## 2.1.0

### Minor Changes

- make packageId optional for website/intpc creation

## 2.0.0

### Major Changes

- Adds breaking change version of the Axios package
- Adds methods for managing whitelisted domains

# @visa/3as-sdk

## 1.3.2

### Patch Changes

- Add plannedDowngradePackageInterval optional field

## 1.3.1

### Patch Changes

- Fix outdated types

## 1.3.0

### Minor Changes

- Added ProRate functionality by explicitly requesting it through a new bool parameter called `proRate` when using the upgrade subscription notification

## 1.2.0

### Minor Changes

- Add support for production environment

## 1.1.0

### Minor Changes

- Added Trial functionality by explicitly requesting it through a new bool parameter called `trial` when using the upgrade subscription notification

## 1.0.0

### Major Changes

- Use https://www.npmjs.com/package/tsup as TypeScript bundler
