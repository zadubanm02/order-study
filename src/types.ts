export interface IProductRequest {
  productId: string;
  quantity: number;
}

export interface IProductOrder extends IProductRequest {
  positionId: string;
}

export interface IServiceProduct extends IProductOrder {
  x: number;
  y: number;
  z: number;
}
