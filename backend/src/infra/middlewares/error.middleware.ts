import { HttpError } from "@infra/errors/HttpError";
import { NextFunction, Request, Response } from "express";
import { StorageError } from "../errors/StorageError";
import { injectable } from "inversify";
import { MulterError } from "multer";
import { Unauthorized } from "../errors/Unauthorized";

@injectable()
export class ErrorMiddleware {
  constructor() {
    this.exec = this.exec.bind(this)
  }

  exec(
    err: unknown,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    if (err instanceof HttpError || err instanceof StorageError) {
      return res.status(err.code ?? 500).json({
        name: err.name,
        message: err.message,
        code: err.code ?? 500,
      });
    }

    if(err instanceof MulterError) {
      const unauthorized = new Unauthorized();
      return res.status(401).json({
        name: unauthorized.name,
        message: unauthorized.message,
        code: unauthorized.code
      });
    }

    return res.status(500).json({
      name: "Internal Server Error",
      code: 500,
    });
  }
}
