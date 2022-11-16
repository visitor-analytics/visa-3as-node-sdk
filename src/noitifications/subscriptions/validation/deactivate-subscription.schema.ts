import Joi from "joi";

export const deactivateSubscriptionSchema = Joi.object({
  intpWebsiteId: Joi.string().required(),
});
