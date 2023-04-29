import { Request, Response } from "express";
import { IProductOrder } from "../types";
import { getProducts } from "../services/product.service";
import { errorHandler } from "../error";

const selectPositions = async (
  req: Request,
  res: Response
): Promise<Response<IProductOrder[], Record<string, any>>> => {
  try {
    const { body } = req;

    // get data from api
    const { result, error } = await getProducts(body);

    // throw if error in processing
    if (error.length > 0) {
      res.status(500).json({
        error: "Process error",
        message: "Couldnt process one ore more products",
      });
    }

    return res.status(200).json(result);
  } catch (err) {
    return errorHandler(err, res);
  }
};

export { selectPositions };
