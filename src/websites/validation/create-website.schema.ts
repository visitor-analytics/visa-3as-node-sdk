import * as joi from "joi";

const createWebsiteSchema = joi
  .object({
    externalId: joi.string().required(),
    externalCustomerId: joi.string().required(),
    domain: joi.string().domain().required(),
    packageId: joi.string().uuid().required(),
  })
  .required();

export { createWebsiteSchema };
