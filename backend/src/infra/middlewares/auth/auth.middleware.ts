import { TokenAdapter } from "@app/adapters/token.adapter";
import { NextFunction, Request, Response } from "express";
import { TokensCacheRepo } from "@app/repositories/tokens.repository";
import { Unauthorized } from "@infra/errors/Unauthorized";
import { inject, injectable } from "inversify";
import { adapterIds } from "@app/adapters/adapterIds";
import { storageIds } from "../../storages/ids";

@injectable()
export class AuthMiddleware {
  constructor(
    @inject(adapterIds.token)
    private readonly tokenAdapter: TokenAdapter,
    @inject(storageIds.cache.tokenEntitie)
    private readonly tokenRepo: TokensCacheRepo
  ) {
    this.exec = this.exec.bind(this);
  }

  private async checkCache(id: string) {
    return await this.tokenRepo.exist({ id });
  }

  async exec (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { authorization: auth } = req.headers;

    if(!auth)
      return next(new Unauthorized());

    const token = auth.split(" ")[1];

    await this.tokenAdapter.validate({ token })
      .then(async (data) => {
        const result = await this.checkCache(data.sub)
        if(!result)
          return next(new Unauthorized());

        res.locals.token = data;
        next();
      })
      .catch(() => {
        next(new Unauthorized());
      }) 
  }
}
