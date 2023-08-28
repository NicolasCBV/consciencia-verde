import { HttpError } from "@infra/errors/HttpError";
import { NextFunction, Request, Response } from "express";
import { StorageError } from "../errors/StorageError";
import { injectable } from "inversify";

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
    console.log(err)
    if (err instanceof HttpError || err instanceof StorageError) {
      return res.status(err.code ?? 500).json({
        name: err.name,
        message: err.message,
        code: err.code ?? 500,
      });
    }

    return res.status(500).json({
      name: "Internal Server Error",
      code: 500,
    });
  }
}
