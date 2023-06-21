import Joi from "joi";

export const upgradeSubscriptionSchema = Joi.object({
  intpWebsiteId: Joi.string().required(),
  packageId: Joi.string().uuid().required(),
  trial: Joi.bool().required(),
  proRate: Joi.bool().required(),
});
