import { Router } from "express";
import BrandRoutes from "./routes/brands";
import ModelRoutes from "./routes/models";

const routes = Router();

routes.use(`/brands`, BrandRoutes);
routes.use(`/models`, ModelRoutes);

export default routes;
