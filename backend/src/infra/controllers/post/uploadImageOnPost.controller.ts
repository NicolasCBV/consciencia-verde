import { NextFunction, Request, Response } from "express";
import { UploadImagePostUseCase } from "@app/use-cases/uploadImageOnPost.use-case";
import { BadRequest } from "../../errors/BadRequest";
import { useCaseIds } from "@app/use-cases/useCaseIds";
import { inject, injectable } from "inversify";

@injectable()
export class UploadImagePostController {
  constructor(
    @inject(useCaseIds.post.uploadImage)
    private readonly uploadImage: UploadImagePostUseCase
  ) {
    this.exec = this.exec.bind(this);
  }

  async exec(req: Request, res: Response, next: NextFunction) {
    if(!req.file || typeof req.params.postId !== "string")
      return next(new BadRequest());
    

    await this.uploadImage.exec({
      postId: req.params.postId,
      file: {
        originalName: req.file?.originalname,
        buffer: req.file?.buffer,
        mimetype: req.file?.mimetype
      }   
    })
      .catch((err) => {
        next(err);
      })

    res.status(200).end();
  }
}
