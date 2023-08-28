import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../../errors/BadRequest";
import { injectable } from "inversify";

@injectable()
export class CreatePostDTO {
  constructor(){
    this.exec = this.exec.bind(this);
  }

  async exec(
    req: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: Response,
    next: NextFunction
  ) {
    const expectedBody = z.object({
      name: z.string(),
      description: z.string(),
      content: z.array(z.string()).min(1)
    }).strict();

    await expectedBody.parseAsync(req.body)
      .then(() => next())
      .catch(() => {
         next(new BadRequest());
      });
  }
}
