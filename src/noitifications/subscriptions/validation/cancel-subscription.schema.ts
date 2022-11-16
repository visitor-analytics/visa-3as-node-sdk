import Joi from "joi";

export const cancelSubscriptionSchema = Joi.object({
  intpWebsiteId: Joi.string().required(),
});
