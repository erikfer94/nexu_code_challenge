import { BaseController } from "../config/baseController";
import { Response, Request } from "express";
import { CarBrand } from "../models/CarBrand";
import { CarModel } from "../models/CarModel";
import {
  postBrandRequestSchema,
  postModelRequestSchema,
} from "../validators/brands";
import { ValidatedRequest } from "express-joi-validation";

export class BrandsController extends BaseController {
  async getAllBrands(_req: Request, res: Response) {
    try {
      const brands = await CarBrand.findAll({
        include: [CarModel],
      });
      return this.successResponse(
        res,
        brands.map((b) => ({
          id: b.id,
          name: b.name,
          average_price: b.averagePrice,
        }))
      );
    } catch (error) {
      console.log(error);
      return this.errorResponse(res, 500, error);
    }
  }

  async getModelBrands(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const brand = await CarBrand.findByPk(id, {
        include: [
          {
            attributes: ["id", "name", "average_price"],
            model: CarModel,
          },
        ],
      });
      return this.successResponse(res, brand.models);
    } catch (error) {
      console.log(error);
      return this.errorResponse(res, 500, error);
    }
  }

  async postBrand(
    req: ValidatedRequest<postBrandRequestSchema>,
    res: Response
  ) {
    const { name } = req.body;
    try {
      const existingBrand = await CarBrand.findOne({
        where: {
          name,
        },
      });
      if (existingBrand) {
        return this.errorResponse(res, 409, "This brand already exists");
      }
      const brand = await CarBrand.create({
        name,
      });
      return this.successResponse(res, brand);
    } catch (error) {
      console.log(error);
      return this.errorResponse(res, 500, error);
    }
  }

  async postModel(
    req: ValidatedRequest<postModelRequestSchema>,
    res: Response
  ) {
    const { name, average_price } = req.body;
    const { id } = req.params;
    try {
      const existingBrand = await CarBrand.findByPk(id, {
        include: [CarModel],
      });
      if (!existingBrand) {
        return this.errorResponse(res, 404, "This brand id is not valid");
      }
      if (existingBrand.models.find((m) => m.name === name)) {
        return this.errorResponse(res, 409, "This model already exists");
      }
      if (average_price < 100000) {
        return this.errorResponse(
          res,
          409,
          "The average price should be 100,000 or greater"
        );
      }
      const brand = await CarModel.create({
        name,
        brand_id: Number(id),
        average_price: average_price || 0,
      });
      return this.successResponse(res, brand);
    } catch (error) {
      console.log(error.message);
      return this.errorResponse(res, 500, error);
    }
  }
}
