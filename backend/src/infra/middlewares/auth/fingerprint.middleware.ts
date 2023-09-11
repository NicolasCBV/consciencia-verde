import { CryptAdapter } from "@app/adapters/crypt";
import { IRefreshToken } from "@app/adapters/token.adapter";
import { Unauthorized } from "@infra/errors/Unauthorized";
import { NextFunction, Request, Response } from "express";
import { adapterIds } from "@app/adapters/adapterIds";
import { inject, injectable } from "inversify";

@injectable()
export class FingerprintMiddleware {
  constructor(
    @inject(adapterIds.crypt)
    private readonly crypt: CryptAdapter
  ) {
    this.exec = this.exec.bind(this);
  }

  private async compareDeviceId(
    deviceId?: string,
    hashedDeviceId?: string | null,
  ) {
    return hashedDeviceId
      ? await this.crypt.compare(String(deviceId), hashedDeviceId)
      : !deviceId;
  }

  async exec(
    req: Request,
    res: Response,
    next: NextFunction
  ) { 
    const token: IRefreshToken | undefined = res.locals.token;
    if (!token) return next(new Unauthorized());

    const searchOnQuery = req.query.deviceId;
    const searchOnBody: string | undefined = req?.body?.deviceId;
  
    const unhashedDeviceId: string | undefined = searchOnQuery 
      ? String(searchOnQuery)
      : searchOnBody;

    if (!(await this.compareDeviceId(unhashedDeviceId, token.deviceId)))
      return next(new Unauthorized());
    
    return next();
  }
}
