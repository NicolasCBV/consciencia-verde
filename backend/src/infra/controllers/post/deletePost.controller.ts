import { NextFunction, Request, Response } from "express";
import { DeletePostUseCase } from "@app/use-cases/deletePost.use-case";
import { BadRequest } from "../../errors/BadRequest";
import { useCaseIds } from "@app/use-cases/useCaseIds";
import { inject, injectable } from "inversify";

@injectable()
export class DeletePostController {
  constructor(
    @inject(useCaseIds.post.delete)
    private readonly deletePostUseCase: DeletePostUseCase
  ) {
    this.exec = this.exec.bind(this);
  }

  async exec(req: Request, res: Response, next: NextFunction) {
    const postId  = req.params?.postId;

    if(typeof postId !== "string")
      return next(new BadRequest());

    await this.deletePostUseCase.exec({ id: postId })
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        next(err);
      })
  }
}
