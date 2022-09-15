import * as joi from "joi";

const updatePackageSchema = joi
  .object({
    name: joi.string().required(),
  })
  .required();

export { updatePackageSchema };
