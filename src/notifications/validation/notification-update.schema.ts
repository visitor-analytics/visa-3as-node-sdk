import Joi from "joi";

export const notificationUpdateSchema = Joi.object({
  type: Joi.string().valid("SUBSCRIPTION_UPDATED").required(),
  payload: {
    packageId: Joi.string().uuid().required(),
    website: {
      id: Joi.string().required(),
    },
  },
});
