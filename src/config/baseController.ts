import { Response } from "express";

export abstract class BaseController {
  successResponse = (res: Response, data: any) => {
    return res.status(200).json(data);
  };

  errorResponse = (res: Response, code: number, error: any) => {
    return res.status(code).json({ error: error.message || error });
  };
}
