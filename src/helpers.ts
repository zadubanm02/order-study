import { IProductOrder, IProductRequest, IServiceProduct } from "./types";

export const isProduct = (product: any): product is IProductRequest => {
  return "productId" in product && "quantity" in product;
};

export const transformResponse = (response: IServiceProduct): IProductOrder => {
  const { productId, positionId, quantity } = response;
  return {
    productId,
    quantity,
    positionId,
  };
};

export const productSort = (a: IProductOrder, b: IProductOrder) => {
  if (a.productId < b.productId) {
    return -1;
  } else if (a.productId > b.productId) {
    return 1;
  } else {
    return a.quantity - b.quantity;
  }
};
