import { Response, Router, Request } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import { BrandsController } from "../controllers/Brands";
import {
  postBrandRequestSchema,
  postBrandSchema,
  postModelRequestSchema,
  postModelSchema,
} from "../validators/brands";

const BrandsRoutes: Router = Router();
const validator = createValidator({
  passError: true,
});
const brandsController = new BrandsController();

BrandsRoutes.get("/", async (req: Request, res: Response): Promise<any> => {
  return await brandsController.getAllBrands(req, res);
});

BrandsRoutes.post(
  "/",
  validator.body(postBrandSchema),
  async (
    req: ValidatedRequest<postBrandRequestSchema>,
    res: Response
  ): Promise<any> => {
    return await brandsController.postBrand(req, res);
  }
);

BrandsRoutes.get(
  "/:id/models",
  async (req: Request, res: Response): Promise<any> => {
    return await brandsController.getModelBrands(req, res);
  }
);

BrandsRoutes.post(
  "/:id/models",
  validator.body(postModelSchema),
  async (
    req: ValidatedRequest<postModelRequestSchema>,
    res: Response
  ): Promise<any> => {
    return await brandsController.postModel(req, res);
  }
);

export default BrandsRoutes;
