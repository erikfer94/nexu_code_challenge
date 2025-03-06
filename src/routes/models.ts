import { Response, Router, Request } from "express";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import { ModelsController } from "../controllers/Models";
import {
  getModelsRequestSchema,
  getModelsSchema,
  patchModelRequestSchema,
  patchModelSchema,
} from "../validators/models";

const ModelsRouter: Router = Router();
const validator = createValidator({
  passError: true,
});

const modelsController = new ModelsController();

ModelsRouter.get(
  "/",
  validator.body(getModelsSchema),
  async (
    req: ValidatedRequest<getModelsRequestSchema>,
    res: Response
  ): Promise<any> => {
    return await modelsController.getAllModels(req, res);
  }
);

ModelsRouter.put(
  "/:id",
  validator.body(patchModelSchema),
  async (
    req: ValidatedRequest<patchModelRequestSchema>,
    res: Response
  ): Promise<any> => {
    return await modelsController.patchModel(req, res);
  }
);

export default ModelsRouter;
