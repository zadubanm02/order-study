import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(
    `${request.method} url:: ${request.url} | body:: ${request?.body}`
  );
  next();
};
