import Joi from "joi";

export const downgradeSubscriptionSchema = Joi.object({
  intpWebsiteId: Joi.string().required(),
  packageId: Joi.string().uuid().required(),
});
