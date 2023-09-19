import { IRefreshToken } from "@app/adapters/token.adapter";
import { NextFunction, Request, Response } from "express";
import { Unauthorized } from "@infra/errors/Unauthorized";
import { injectable } from "inversify";

@injectable()
export class AdminMiddleware {
	async exec (
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const token: IRefreshToken | undefined = res.locals.token;
		if (!token || token.userData.level <= 0) 
			return next(new Unauthorized());

		next();
	}
}
