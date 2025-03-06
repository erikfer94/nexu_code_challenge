import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export const postBrandSchema = Joi.object({
  name: Joi.string().required(),
});

export interface postBrandRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
  };
}

export const postModelSchema = Joi.object({
  name: Joi.string().required(),
  average_price: Joi.number(),
});

export interface postModelRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    name: string;
    average_price?: number;
  };
  [ContainerTypes.Params]: {
    id: string;
  };
}
