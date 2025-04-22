import * as joi from "joi";

const createWebsiteSchema = joi
  .object({
    intpWebsiteId: joi.string().required(),
    intpCustomerId: joi.string().required(),
    domain: joi.string().domain().required(),
    packageId: joi.string().uuid().optional(),
    billingDate: joi.string().optional(),
  })
  .required();

export { createWebsiteSchema };
