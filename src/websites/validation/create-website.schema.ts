import * as joi from "joi";

const createWebsiteSchema = joi
  .object({
    intpWebsiteId: joi.string().required(),
    intpCustomerId: joi.string().required(),
    domain: joi.string().domain().required(),
    packageId: joi.string().uuid().required(),
  })
  .required();

export { createWebsiteSchema };
