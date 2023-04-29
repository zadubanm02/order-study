import axios from "axios";
import { IProductOrder, IProductRequest, IServiceProduct } from "../types";
import { WrongInputExeption } from "../error";
import { productSort, transformResponse } from "../helpers";

export const getProducts = async (products: IProductRequest[]) => {
  try {
    // throw if wrong input
    if (!Array.isArray(products) || products.length === 0) {
      throw new WrongInputExeption("Wrong or empty input");
    }
    const result: IProductOrder[] = [];
    const error: unknown[] = [];
    // fire promises for faster processing
    const promises = products.map((product) => {
      return axios.get<IServiceProduct[]>(
        `https://dev.aux.boxpi.com/case-study/products/${product.productId}/positions`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
          },
        }
      );
    });
    const results = await Promise.allSettled(promises);
    results.forEach((res) => {
      if (res.status === "fulfilled") {
        const transformedResponse: IProductOrder[] = res.value.data.map(
          (product) => transformResponse(product)
        );
        result.push(...transformedResponse);
      }
      if (res.status === "rejected") {
        error.push(res.reason);
      }
    });
    return { result: result.sort(productSort), error };
  } catch (error) {
    console.log("Service Error", error);
    throw error;
  }
};
