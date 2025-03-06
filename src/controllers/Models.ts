import { BaseController } from "../config/baseController";
import { Response, Request } from "express";
import { CarModel } from "../models/CarModel";
import { ValidatedRequest } from "express-joi-validation";
import {
  getModelsRequestSchema,
  patchModelRequestSchema,
} from "../validators/models";
import { Op } from "sequelize";

export class ModelsController extends BaseController {
  async getAllModels(
    req: ValidatedRequest<getModelsRequestSchema>,
    res: Response
  ) {
    const { greater, lower } = req.query;
    try {
      const where = {
        [Op.gte]: greater || 0,
      };
      const models = await CarModel.findAll({
        where: {
          average_price: { ...where, ...(lower ? { [Op.lte]: lower } : {}) },
        },
      });
      return this.successResponse(res, models);
    } catch (error) {
      console.log(error);
      return this.errorResponse(res, 500, error);
    }
  }

  async patchModel(
    req: ValidatedRequest<patchModelRequestSchema>,
    res: Response
  ) {
    const { average_price } = req.body;
    const { id } = req.params;
    try {
      const existingModel = await CarModel.findByPk(id);
      if (!existingModel) {
        return this.errorResponse(res, 404, "This model id is not valid");
      }
      if (average_price < 100000) {
        return this.errorResponse(
          res,
          409,
          "The average price should be 100,000 or greater"
        );
      }
      const newModel = await existingModel.update({
        average_price,
      });
      return this.successResponse(res, newModel);
    } catch (error) {
      console.log(error);
      return this.errorResponse(res, 500, error);
    }
  }
}
