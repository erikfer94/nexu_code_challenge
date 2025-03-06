import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import Joi from "joi";

export const patchModelSchema = Joi.object({
  average_price: Joi.number().required(),
});

export interface patchModelRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    average_price: number;
  };
  [ContainerTypes.Params]: {
    id: string;
  };
}

export const getModelsSchema = Joi.object({
  greater: Joi.number(),
  lower: Joi.number(),
});

export interface getModelsRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    greater?: number;
    lower?: number;
  };
}
