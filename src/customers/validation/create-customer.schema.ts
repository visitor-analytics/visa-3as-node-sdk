import Joi from "joi";

export const createCustomerSchema = Joi.object({
  intpCustomerId: Joi.string().required(),
  email: Joi.string().email().required(),
  website: {
    intpWebsiteId: Joi.string().required(),
    domain: Joi.string().uri().required(),
    packageId: Joi.string().uuid().required(),
  },
});
