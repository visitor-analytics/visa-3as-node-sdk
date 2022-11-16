import Joi from "joi";

export const resumeSubscriptionSchema = Joi.object({
  intpWebsiteId: Joi.string().required(),
});
