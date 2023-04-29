import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: Error | unknown, res: Response) => {
  if (error instanceof SyntaxError) {
    return res.status(400).json({
      error: "Bad request",
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });
  }
  if (error instanceof TypeError) {
    return res.status(500).json({
      error: "Type server error",
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    });
  }

  if (error instanceof WrongInputExeption) {
    return res.status(400).json({
      error: "Bad request",
      message: "Wrong or empty input",
      name: "Wrong input",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
    message: "Unexpected error",
  });
};

export class WrongInputExeption extends Error {}
