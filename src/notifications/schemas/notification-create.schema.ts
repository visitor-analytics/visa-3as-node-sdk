import Joi from "joi";

export const notificationCreateSchema = Joi.object({
  type: Joi.string().valid("SUBSCRIPTION_CREATED").required(),
  payload: {
    packageId: Joi.string().uuid().required(),
    website: {
      id: Joi.string().required(),
      domain: Joi.string().uri().required(),
      language: Joi.string().valid("en").optional(),
      timezone: Joi.string().optional(), //TODO add timezone validation
    },
    customer: {
      id: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  },
});
