import { inject, injectable } from "inversify";
import { PostRepo } from "../repositories/post.repository";
import { PostTypes } from "../repositories/types/post.types";
import { storageIds } from "@infra/storages/ids";

@injectable()
export class DeletePostUseCase {
	constructor(
    @inject(storageIds.external.postRepo)
    private readonly postRepo: PostRepo
	) {}

	async exec(input: PostTypes.IDelete) {
		return await this.postRepo.deletePost(input);
	}
}
