import { IRefreshToken } from "@app/adapters/token.adapter";
import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "@infra/errors/Unauthorized";
import { SearchManager } from "@infra/storages/search/search-manager";
import { storageIds } from "../../storages/ids";
import { inject, injectable } from "inversify";

@injectable()
export class AdminMiddleware {
  constructor(
    @inject(storageIds.search.manager)
    private readonly searchManager: SearchManager
  ) {
    this.exec = this.exec.bind(this);
  }

  async exec (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token: IRefreshToken | undefined = res.locals.token;
    if (!token) return next(new Unauthorized());

    const result = await this.searchManager.checkExistence({ 
      userId: token.sub 
    });

    if(!result)
      return next(new Unauthorized());

    next();
  }
}
