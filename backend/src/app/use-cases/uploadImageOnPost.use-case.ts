import { inject, injectable } from "inversify";
import { PostRepo } from "../repositories/post.repository";
import { PostTypes } from "../repositories/types/post.types";
import { storageIds } from "@infra/storages/ids";

@injectable()
export class UploadImagePostUseCase {
  constructor(
    @inject(storageIds.external.postRepo)
    private readonly postRepo: PostRepo
  ) {}

  async exec(input: PostTypes.ISetImage) {
    return await this.postRepo.setImage(input);
  }
}
